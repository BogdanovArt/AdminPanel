<template>
  <td
    :class="['table-row-names', !item.action && 'disabled']"
    :style="item.style"
    v-on="item.action && { click: () => trigger(item.action) }"
  >
    <div :class="['table-cell-names', { centered: item.title.length < 3 }]">
      <span v-if="item.icon" class="table-icon">
        <v-icon>{{ item.icon }}</v-icon>
      </span>
      <span :title="item.title">{{ item.title }}</span>
      <span class="divider">|</span>
      <span v-if="chevron" class="row-chevron"
        ><v-icon>mdi-menu-down</v-icon></span
      >
    </div>
  </td>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import CellBase from "@/components/catalog/table/items/CellBase";

import { ITableCell } from "@/store/modules/catalog/interfaces";

@Component
export default class CellName extends CellBase {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ITableCell;

  @Prop({ type: Boolean, default: false })
  readonly chevron!: boolean;
}
</script>

<style lang="scss" scoped>
.centered {
  justify-content: center;
}
</style>
