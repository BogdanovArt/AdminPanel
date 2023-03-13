<template>
  <div :class="['checkbox-wrapper', !item.action && 'inactive']">
    <v-btn
      text
      icon
      data-test="table-controls-select"
      class="link-icon"
      v-on="item.action && { click: () => trigger(item.action) }"
    >
      <v-icon :color="item.checked ? 'green' : null">link</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CtrlSelect",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    trigger: {
      type: Function,
      default: () => null,
    },
  },
};
</script>

<style lang="scss">
.checkbox-wrapper {
  position: absolute;
  margin: 0 -18px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 18px;
  user-select: none;
  .active {
    color: green;
  }
  &:not(.inactive):hover {
    .link-icon > * {
      color: #668ecc !important;
    }
  }
}
.link-icon {
  margin-right: 10px;
}
.inactive * {
  color: lightgray !important;
}
</style>
