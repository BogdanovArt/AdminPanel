<template>
  <div data-test="input-expandable-block" class="input-group">
    <template v-for="(item, i) in items">
      <Dispatcher :key="i" :item="item" :handler="inputHandler" :errors="errors" v-on="$listeners"/>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Dispatcher from "./Dispatcher.vue";

import { IErrors, InputItem } from "@/store/modules/product/interfaces";
import { InputValue } from "@/store/interfaces";

@Component({
  components: {
    Dispatcher,
  },
})
export default class InputExpandableGroup extends Vue {
  @Prop() readonly id?: number;
  @Prop() readonly items!: InputItem;
  @Prop() readonly handler!: (
    name: string,
    val: InputValue,
    id?: number
  ) => void;
  @Prop() readonly errors?: IErrors;

  inputHandler(name: string, val: InputValue) {
    this.handler(name, val, this.id );
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  padding: 10px 0;
}
</style>
