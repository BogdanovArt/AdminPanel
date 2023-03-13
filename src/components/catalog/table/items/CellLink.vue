<template>
  <td
    :class="['table-links', !item.action && 'disabled']"
    :style="item.style"
    v-on="item.action && { click: () => trigger(item.action) }"
    width="40%"
  >
    <div>
      <span
        :class="[
          item.title.length > 3 && 'linkable',
          item.title === 'Нет привязки' && 'unlinked',
        ]"
        >{{ item.title }}</span
      >
      <span class="divider">|</span>
    </div>
  </td>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import CellBase from "@/components/catalog/table/items/CellBase";

import { ITableCell } from "@/store/modules/catalog/interfaces";

@Component
export default class CellExternal extends CellBase {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ITableCell;
}
</script>
