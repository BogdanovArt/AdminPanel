<template>
  <div class="input-story">
    <div class="input-info">Передаваемое значение: {{ val }}</div>

    <div class="input-wrapper">
      <span class="input-label">{{ item.label }}:</span>
      <simple v-bind="item" type="text" :mask="calculatedMask" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SimpleInput } from "@netex/inputs";

import { IValidation } from "@/store/modules/product/interfaces";
import { InputValue } from "@/store/interfaces";

enum validationTypes {
  INT = "nullable|integer",
  FLOAT = "nullable|numeric",
}

function integerMask(value: string) {
  const length = value.length;
  const mask = new Array(length <= 9 ? length : 9);
  mask.fill(/[0-9]/);
  return mask;
}

function floatMask(value: string) {
  const digit = /[0-9]/;
  const length = value.length;
  const chunks = value.replace(",", ".").split(".");
  let mask;
  switch (chunks.length) {
    case 1:
      mask = new Array(length).fill(digit);
      return mask;
    default:
      mask = [
        ...new Array(chunks[0].length || 1).fill(digit),
        ".",
        ...new Array(chunks[1].length > 2 ? 2 : chunks[1].length).fill(digit),
      ];
      return mask;
  }
}
function strictMask(symbol: RegExp) {
  return (value: string) => {
    const mask = Array(value.length).fill(symbol);
    return mask;
  };
}

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
  @Prop() readonly max!: IValidation;
  @Prop() readonly min!: IValidation;
  @Prop() readonly regex!: IValidation;
  @Prop() readonly placeholder!: string | undefined;
  @Prop() readonly value!: string | undefined;
  @Prop() readonly disabled!: boolean;
  @Prop() readonly required!: boolean;
  @Prop() readonly allowedCharacters!: string | undefined;

  get item() {
    return {
      ...this.$props,
      allowedCharacters: this.allowedCharacters,
      initial: this.value,
      returnValue: this.inputHandler,
    };
  }

  get calculatedMask() {
    const item = this.item as any;
    if (item.mask) {
      return item.mask;
    } else {
      switch (true) {
        case item.rules && item.rules === validationTypes.INT:
          return {
            value: integerMask,
            errorMessage: "Поле заполнено некорректно",
          };
        case item.rules && item.rules === validationTypes.FLOAT:
          return {
            value: floatMask,
            errorMessage: "Поле заполнено некорректно",
          };
        case !!item.allowedCharacters:
          return {
            value: strictMask(
              new RegExp(item.allowedCharacters || "^[a-zA-Z0-9]+$")
            ),
            errorMessage: "Некорректное значение",
          };
        default:
          return null;
      }
    }
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
