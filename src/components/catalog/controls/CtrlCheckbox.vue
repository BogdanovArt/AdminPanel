<template>
  <div data-test="table-controls-checkbox" class="checkbox-select">
    <v-checkbox
      v-model="item.checked"
      :label="item.title"
      :disabled="!item.action"
      v-on="
        item.action && { change: (state) => changeHandler(item.action, state) }
      "
    />
  </div>
</template>

<script lang="ts">
import {
  ICatalogAction,
  ICellControl,
} from "@/store/modules/catalog/interfaces";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CheckboxSelect extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ICellControl;

  @Prop({ type: Function, default: () => null })
  readonly trigger!: (action: ICatalogAction) => void;

  changeHandler(action: ICatalogAction, checked: boolean) {
    const actionCopy = JSON.parse(JSON.stringify(action));
    actionCopy.data = { ...action.data, checked };
    this.trigger(actionCopy);
  }
}
</script>
