<template>
  <div class="input-story">
    <div class="input-info">Передаваемое значение: {{ val }}</div>

    <div class="input-wrapper">
      <span class="input-label">{{ item.label }}:</span>
      <c-box
        :name="item.name"
        :value="item.checked"
        :return-value="inputHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import InputCheckbox from "@/components/inputs/InputCheckbox.vue";

import { InputValue } from "@/store/interfaces";

@Component({
  components: {
    cBox: InputCheckbox,
  },
})
export default class InputExpandableGroup extends Vue {
  val: any = null;

  @Prop() readonly type!: string;
  @Prop() readonly name!: string;
  @Prop() readonly label!: string;
  @Prop() readonly checked!: boolean;

  get item() {
    return {
      ...this.$props,
      returnValue: this.inputHandler,
    };
  }

  inputHandler(name: string, val: InputValue) {
    this.val = val;
    console.log(name, val);
  }
}
</script>

<style lang="scss" scoped>
.input-info {
  color: $hint-color;
}
.input-wrapper {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  .input-label {
    margin-top: 8px;
    min-width: 324px;
    max-width: 324px;
  }
}
</style>
