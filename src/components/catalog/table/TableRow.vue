<template>
  <tr :class="'row-' + item.type" :style="item.style">
    <template v-for="(el, ind) in item.data">
      <component
        :is="el.type"
        :key="ind"
        :item="el"
        :data-test="`table-row-${el.type}`"
        :chevron="item.type === 'breadcrumbs' && ind === 0"
        :trigger="executor"
        :set="setAction"
      />
    </template>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import CellName from "@/components/catalog/table/items/CellName.vue";
import CellLink from "@/components/catalog/table/items/CellLink.vue";
import CellControls from "@/components/catalog/table/items/CellControls.vue";
import CellExternal from "@/components/catalog/table/items/CellExternal.vue";

import { IActions } from "./items/interfaces";
import { ICatalogAction, ITableRow } from "@/store/modules/catalog/interfaces";

@Component({
  components: {
    name: CellName,
    links: CellLink,
    external: CellExternal,
    controls: CellControls,
  }
})
export default class TableRow extends Vue {
  actions: IActions = {};

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ITableRow;

  @Prop({ type: Function, default: () => null })
  readonly executor!: (action: ICatalogAction) => void;

  setAction(actions: IActions) {
    this.actions = actions;
  }
}
</script>

