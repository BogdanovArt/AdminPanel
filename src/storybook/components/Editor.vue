<template>
  <div class="input-story">
    <div class="input-info">Передаваемое значение: {{ val }}</div>

    <div class="input-wrapper">
      <span class="input-label">{{ item.label }}:</span>
      <editor
        :name="item.name"
        :initial="item.value"
        :returnValue="inputHandler"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import TextArea from "@/components/inputs/TextArea.vue";

import { InputValue } from "@/store/interfaces";

@Component({
  components: {
    editor: TextArea,
  },
})
export default class InputExpandableGroup extends Vue {
  val: any = null;

  @Prop() readonly type!: string | undefined;
  @Prop() readonly name!: string;
  @Prop() readonly label!: string | undefined;
  @Prop() readonly value!: string | undefined;

  get item() {
    return {
      ...this.$props,
      initial: this.value,
      returnValue: this.inputHandler,
    };
  }

  inputHandler(name: string, val: InputValue) {
    this.val = val;
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
