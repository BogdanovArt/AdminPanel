<template>
  <div class="input-wrapper">
    <template v-if="item.type === 'text' || item.type === 'number'">
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <simple
        v-bind="item"
        :type="'text'"
        :initial="item.value"
        :mask="mask"
        :error-msg="errors && errors[item.name]"
        :return-value="inputHandler"
        style="margin: 0;"
      >
        <tool-tip v-if="item.tooltip" :tooltip="item.tooltip" />
      </simple>
      <div v-if="item.controls && item.controls.length" class="input-controls">
        <template v-for="(btn, i) in item.controls">
          <c-button
            :key="i"
            v-bind="btn"
            @click="() => actionHandler(btn.action)"
          />
        </template>
      </div>
    </template>

    <template v-else-if="item.type === 'image-upload'">
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <file-input
        v-bind="item"
        :return-value="inputHandler"
      />
    </template>

    <template v-else-if="item.type === 'checkbox'">
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <c-box
        :name="item.name"
        :value="item.checked"
        :return-value="inputHandler"
      />
    </template>

    <template v-else-if="item.type === 'radio'">
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <radio-input v-bind="item" :return-value="inputHandler" />
    </template>

    <template v-else-if="item.type === 'textarea'">
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <editor
        :name="item.name"
        :initial="item.value"
        :returnValue="inputHandler"
      />
    </template>

    <template v-else-if="item.type === 'dropdown'">
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <drop-down v-bind="item" :return-value="inputHandler" />
    </template>

    <template v-else>
      <span class="input-label">{{ item.label ? item.label + ":" : "" }}</span>
      <component :is="item.type" v-bind="item" :return-value="inputHandler" />
      <!-- <pre> {{ item }}</pre> -->
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SimpleInput } from "@netex/inputs";

import TextArea from "@/components/inputs/TextArea.vue";
import InputCheckbox from "@/components/inputs/InputCheckbox.vue";
import FileInput from "@/components/inputs/FileInput.vue";
import RadioInput from "@/components/inputs/Radio.vue";
import { DropDown } from "@/components/inputs/DropDown";
import Button from "@/components/common/Button.vue";
import ToolTip from "@/components/inputs/ToolTip.vue";

import {
  IErrors,
  IFormInput,
  InputItem,
} from "@/store/modules/product/interfaces";
import { InputValue } from "@/store/interfaces";
import { ICatalogAction } from "@/store/modules/catalog/interfaces";

enum validationTypes {
  INT = "nullable|integer",
  FLOAT = "nullable|numeric",
}

interface Additional {
  [key: string]: Vue;
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
    editor: TextArea,
    cBox: InputCheckbox,
    cButton: Button,
    FileInput,
    DropDown,
    RadioInput,
    ToolTip,
  },
})
export default class InputExpandableGroup extends Vue {
  @Prop() readonly additionalComponents!: Additional;
  @Prop() readonly item!: InputItem;
  @Prop() readonly handler!: (name: string, val: InputValue) => void;
  @Prop() readonly errors?: IErrors;

  get mask() {
    const item = this.item as IFormInput;
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
              new RegExp(item.allowedCharacters || "^[a-zA-Z0-9]+$"),
            ),
            errorMessage: "Некорректное значение",
          };
        default:
          return null;
      }
    }
  }

  inputHandler(name: string, val: InputValue) {
    // console.warn("handler", name, val);
    this.handler(name, val);
  }

  actionHandler(action?: ICatalogAction) {
    this.$emit("action", action);
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: grid;
  align-items: flex-start;
  padding: 10px 0;
  grid-template-columns: 324px 1fr auto;
}
.input-controls {
  display: flex;
  gap: 10px;
  padding-left: 10px;
}
</style>
