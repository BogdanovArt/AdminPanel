<template>
  <td :class="['actions', 'dense', 'table-controls']"  :style="item.style">
    <div>
      <template v-for="(el,ind) in item.items">
        <component :is="el.type" :item="el" :key="ind" :trigger="trigger" />
      </template>
    </div>
  </td>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";

import CellBase from "@/components/catalog/table/items/CellBase";

import CtrlSection from "@/components/catalog/controls/CtrlSection.vue";
import CtrlItems from "@/components/catalog/controls/CtrlItems.vue";
import CtrlSelect from "@/components/catalog/controls/CtrlSelect.vue";
import CtrlLoader from "@/components/catalog/controls/CtrlLoader.vue";
import CtrlCheckbox from "@/components/catalog/controls/CtrlCheckbox.vue";

import { IActions } from "./interfaces";
import { ITableCellCtrls } from "@/store/modules/catalog/interfaces";

@Component({
  components: {
    execute: CtrlSection,
    toggle: CtrlItems,
    bind: CtrlSelect,
    processing: CtrlLoader,
    checkbox: CtrlCheckbox,
  },
})
export default class CellControls extends CellBase {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ITableCellCtrls;

  mounted() {
    const actions: IActions = {};
    if (this.item.items) {
      this.item.items.forEach( el => {
        if (el.action) actions[el.type] = el.action;
      })
      this.set(actions);
    }
  }
}
</script>

