<template>
  <v-checkbox
    v-model="checkbox"
    :data-test="`input-checkbox-${name}`"
    label=""
    class="checkbox"
    @change="changeHandler"
  ></v-checkbox>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "InputCheckbox",
  props: {
    name: { type: String || Number, default: "" },
    returnValue: { type: Function, default: () => null },
    value: { type: Boolean, default: false },
  },
  data: () => ({
    checkbox: false,
  }),
  watch: {
    checkbox() {
      this.returnValue(this.name, this.checkbox);
    },
  },
  mounted() {
    this.checkbox = this.value;
  },
  methods: {
    changeHandler() {
      this.returnValue(this.name, this.checkbox);
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  margin-top: 3px;
  max-height: 30px;
  ::v-deep {
    .primary--text {
      color: $main-color !important;
      caret-color: $main-color !important;
    }
  }
}
</style>
