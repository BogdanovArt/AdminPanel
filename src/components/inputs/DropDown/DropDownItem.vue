<template>
  <div
    :data-test="`dropdown-item-${item.id}`"
    :class="['dropdown-item', (item.selected && 'selected')]"
    @click="returnValue(item)"
  >
    <div class="items-wrapper">
      <span v-if="selectMultiple" class="item-checkbox">
        <v-checkbox
          class="checkbox"
          v-model="item.selected"
          readonly
          dense
          label=""
        ></v-checkbox>
      </span>
      <span v-if="item.icon" class="item-icon">
        <img
          :src="item.icon.url"
          :alt="item.icon.title"
        >
      </span>
      <span class="item-title">{{ item[titleKey] }}</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "DropDownItem",
  props: {
    item: { type: Object, default: () => ({}) },
    titleKey: { type: String },
    selectMultiple: { type: Boolean, default: false },
    returnValue: { type: Function, default: () => null },
  }
});
</script>

<style lang="scss">
.dropdown-item {
  cursor: pointer;
  display: block;
  padding: 4px 20px;
  user-select: none;
  &:hover{
    background: rgba(0,0,0,.025);
  }
  span {
    display: flex;
    align-items: center;
    &.item-title {
      display: block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &.item-icon {
      height: 20px;
      margin-right: 9px;
      img {
        object-fit: contain;
        height: 100%;
      }
    }
    .v-input--selection-controls{
      margin: 0;
      padding-top: 0;
      height: 24px;
    }
    .v-input__control {
      max-height: 20px !important;
    }
  }
}
.selected {
  color: $main-color;
}
.items-wrapper{
  display: flex;
  align-items: center;
}
</style>