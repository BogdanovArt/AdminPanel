<template>
  <td
    :class="['table-links', !item.action && 'disabled']"
    :style="item.style"
    width="40%"
  >
    <div>
      <a v-if="item.action" :href="item.action.url" target="_blank">
        <span
          :class="[
            item.title.length > 3 && 'linkable',
            item.title === 'Нет привязки' && 'unlinked',
          ]"
          >{{ item.title }}</span
        >
      </a>
      <span
        v-else
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

<style lang="scss" scoped>
a {
  text-decoration: none;
  &:hover {
    color: #86ad00;
  }
}
</style>
