<template>
  <div data-test="dropdown-list-selected" class="dropdown-list-selected">
    <template v-for="(item, ind) in items">
      <drop-down-item-selected
        :key="ind"
        :title-key="titleKey"
        :return-value="returnValue"
        :item="item"
      />
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import DropDownItemSelected from "./DropDownItemSelected";

export default Vue.extend({
  name: "DropDownListSelected",
  components: { DropDownItemSelected },
  props: {
    items: { type: Array, default: () => [] },
    titleKey: { type: String },
    returnValue: { type: Function, default: () => null },
  }
});
</script>

<style lang="scss" scoped>
.dropdown-list-selected {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
}
</style>