<template>
  <div class="input-story">
    <div class="input-info">Передаваемое значение: {{ val }}</div>

    <div class="input-wrapper">
      <span class="input-label">{{ item.label }}:</span>
      <drop-down v-bind="item" :return-value="inputHandler" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { SimpleInput } from "@netex/inputs";

import TextArea from "@/components/inputs/TextArea.vue";
import InputCheckbox from "@/components/inputs/InputCheckbox.vue";
import FileInput from "@/components/inputs/FileInput.vue";
import { DropDown } from "@/components/inputs/DropDown";

import { InputValue } from "@/store/interfaces";

interface SelectItem {
  id: number;
  title: string;
}

@Component({
  components: {
    simple: SimpleInput,
    editor: TextArea,
    cBox: InputCheckbox,
    FileInput,
    DropDown,
  },
})
export default class InputExpandableGroup extends Vue {
  val: any = null;

  @Prop() readonly type!: string | undefined;
  @Prop() readonly name!: string;
  @Prop() readonly label!: string | undefined;
  @Prop() readonly endpoint!: string | undefined;
  @Prop() readonly placeholder!: string | undefined;
  @Prop() readonly listItems!: SelectItem[];
  @Prop() readonly listSelected!: SelectItem[]; 
  @Prop() readonly enableAddition!: boolean;
  @Prop() readonly selectMultiple!: boolean;
  @Prop() readonly disabled!: boolean;

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
