<template>
  <div class="input-story">
    <div class="input-info">Передаваемое значение: {{ val }}</div>

    <div class="input-wrapper">
      <span class="input-label">{{ item.label }}:</span>
      <simple v-bind="item" type="text" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SimpleInput } from "@netex/inputs";

import { InputValue } from "@/store/interfaces";

@Component({
  components: {
    simple: SimpleInput,
  },
})
export default class InputExpandableGroup extends Vue {
  val: any = null;

  @Prop() readonly type!: string | undefined;
  @Prop() readonly name!: string;
  @Prop() readonly label!: string | undefined;
  @Prop() readonly placeholder!: string | undefined;
  @Prop() readonly value!: string | undefined;
  @Prop() readonly disabled!: boolean;

  get item() {
    return {
      ...this.$props,
      initial: this.value,
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
