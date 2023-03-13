<template>
  <div
    :title="item.title"
    v-on="item.action && { click: () => trigger(item.action) }"
  >
    <v-btn text :data-test="`row-controls-${item.icon}`" icon>
      <v-icon small>{{ item.icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CtrlSection",
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
