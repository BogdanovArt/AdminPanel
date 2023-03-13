<template>
  <div ref="wrapper" data-test="dropdown-list" class="dropdown-list-wrapper">
    <div v-if="loading" class="dropdown-overlay" />
    <template v-if="items.length">
      <template v-for="(item, ind) in items">
        <drop-down-item
          :key="ind"
          :title-key="titleKey"
          :return-value="returnValue"
          :item="item"
          :select-multiple="selectMultiple"
        />
      </template>

      <div ref="intersection" style="width: 100%; height: 1px;"></div>
    </template>
    <template v-else>
      <div class="empty-warning">
        <v-icon>mdi-information-outline</v-icon> Нет результатов
      </div>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import DropDownItem from "./DropDownItem";

export default Vue.extend({
  name: "DropDownList",
  components: { DropDownItem },
  props: {
    titleKey: { type: String },
    items: { type: Array, default: () => [] },
    selectMultiple: { type: Boolean, default: false },
    returnValue: { type: Function, default: () => null },
    onScrollEnd: { type: Function, default: () => null },
    loading: { type: Boolean, default: false }
  },
  mounted() {
    const sticky = this.$refs.intersection;

    const options = {
      threshold: [1],
    };
    if (sticky) {
      const observer = new IntersectionObserver(this.scrollHandler, options);
      observer.observe(sticky);
    }
  },
  methods: {
    scrollHandler(entries) {
      const scrolledIn = entries.length ? entries[0].intersectionRatio : 0;
      const wrapper = this.$refs.wrapper;
      if (
        scrolledIn
        && wrapper
        && wrapper.scrollHeight > wrapper.offsetHeight
      ) {
        this.onScrollEnd();
      }
    },
    toTop() {
      this.$refs.wrapper.scrollTo(0, 0);
    }
  }
});
</script>

<style lang="scss" scoped>
.dropdown-list-wrapper {
  position: absolute;
  background: #fff;
  left: 0;
  right: 0;
  top: 40px;
  padding: 10px 0;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  /*padding: 10px 20px;*/
  max-height: 340px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 30;

  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  .empty-warning {
    padding: 0 20px;
    color: #b6b6b6;
    cursor: default;
    i {
      margin-right: 5px;
      color: #b6b6b6;
    }
  }
}
.dropdown-overlay {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(255,255,255,.5);
  z-index: 90;
}
</style>