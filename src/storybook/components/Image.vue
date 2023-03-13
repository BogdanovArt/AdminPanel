<template>
  <div class="input-story">
    <div class="input-info">Передаваемое значение: {{ val }}</div>

    <div class="input-wrapper">
      <span class="input-label">{{ item.label }}:</span>
      <file-input v-bind="item" :items="images" :return-value="inputHandler" />
      <v-btn class="test-button" @click="emulateValueChange"
        >Добавить изображение
        <div>(эта кнопка только в сторибуке, в исходниках её не будет)</div>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import FileInput from "@/components/inputs/FileInput.vue";

import { InputValue } from "@/store/interfaces";

@Component({
  components: {
    FileInput,
  },
})
export default class InputExpandableGroup extends Vue {
  val: any = null;
  images: any = [];

  @Prop() readonly type!: string | undefined;
  @Prop() readonly name!: string;
  @Prop() readonly label!: string | undefined;
  @Prop() readonly placeholder!: string | undefined;
  @Prop() readonly items!: any[];
  @Prop() readonly endpoint!: string;
  @Prop() readonly formats!: string[];
  @Prop() readonly maxCount!: number;
  @Prop() readonly maxSize!: number;
  @Prop() readonly minSize!: number;
  @Prop() readonly maxWidth!: number;
  @Prop() readonly minWidth!: number;
  @Prop() readonly maxHeight!: number;
  @Prop() readonly minHeight!: number;

  get item() {
    return {
      ...this.$props,
      returnValue: this.inputHandler,
    };
  }

  emulateValueChange() {
    const newItems = [...this.images];
    newItems.push({
      type: "image",
      id: 22 + this.images.length,
      url: "https://picsum.photos/205",
    });
    this.images = newItems;
  }

  inputHandler(name: string, val: InputValue) {
    this.val = val;
  }

  mounted() {
    this.images = this.items;
  }
}
</script>

<style lang="scss" scoped>
.input-info {
  color: $hint-color;
}
.test-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  ::v-deep .v-btn__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    div {
      color: lightblue;
      font-size: 10px;
    }
  }
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
