<template>
  <div
    :data-test="`dropdown-item-selected-${item.id}`"
    :class="['dropdown-item-selected', (item.selected && 'selected')]"
  >
    <div class="tag-title">
      <span>{{ item[titleKey] }}</span>
    </div>
    <span
      class="close-button"
      @click="returnValue(item, true)"
    >
      <v-icon>
        mdi-close
      </v-icon>
    </span>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "DropDownItemSelected",
  props: {
    item: { type: Object, default: () => ({}) },
    titleKey: { type: String },
    selectMultiple: { type: Boolean, default: false },
    returnValue: { type: Function, default: () => null },
  }
});
</script>

<style lang="scss" scoped>
$w: 180px;
.dropdown-item-selected {
  position: relative;
  display: flex;
  align-items: center;
  cursor: default;
  padding: 4px 4px 4px 10px;
  border-radius: 20px;
  background: $main-color;
  margin: 0 5px 5px 0;
  max-width: $w;
  > * {
    display: flex;
    color: #fff;
    max-width: 100%;
    width: 100%;
    align-items: center;
    &.tag-title span{
      display: block;
      text-transform: lowercase;
      line-height: 20px;
      max-width: 100%;
      padding-right: 20px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.close-button{
      cursor: pointer;
      position: absolute;
      right: 4px;
      margin-left: 3px;
      border-radius: 50%;
      transition: .25s;
      width: 16px;
      height: 16px;
      i {
        color: #fff;
        font-size: 16px !important;
      }
      &:hover{
        background: #fff;
        i {
          color: $main-color !important;
        }
      }
    }
  }
}
.selected {
  color: $main-color;
}
</style>