<template>
  <div class="radio-input">
    <v-radio-group v-model="selected" :disabled="disabled">
      <v-radio
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

interface Item {
  value: string;
  label: string;
}

@Component
export default class RadioInput extends Vue {
  @Prop({ type: Function, default: () => null })
  readonly returnValue!: (name: string, value: string) => void;

  @Prop({ type: String, default: "" })
  readonly label!: string;

  @Prop({ type: String, default: "" })
  readonly name!: string;

  @Prop({ type: String, default: "" })
  readonly value!: string;

  @Prop({ type: Boolean, default: false })
  readonly disabled!: string;

  @Prop({ type: Array, default: () => [] })
  readonly items!: Item[];

  selected = this.value;

  @Watch("value")
  valueWatcher(value: string) {
    this.selected = value;
  }

  @Watch("selected")
  selectedWatcher(value: string) {
    this.returnValue(this.name, value);
  }

  mounted() {
    this.selectedWatcher(this.value);
  }
}
</script>

<style lang="scss" scoped>
.radio-input {
  > * {
    margin: 0;
  }
}
</style>
