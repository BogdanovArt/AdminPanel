<template>
  <v-switch
    :disabled="!item.action"
    v-model="value"
    :label="item.title"
    data-test="table-controls-switch"
    v-on="item.action && { change: () => trigger(item.action) }"
  ></v-switch>
</template>

<script>
export default {
  name: "CtrlItems",
  data: () => ({
    value: false,
  }),
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    trigger: {
      type: Function,
      default: () => null,
    }
  },
  watch: {
    item: {
      deep: true,
      handler: function(){
        this.toggleSwitcher()
      }
    }
  },
  mounted() {
    this.toggleSwitcher()
  },
  methods: {
    toggleSwitcher() {
      this.value = this.item.icon === 'toggle_on'
    }
  }
}
</script>

