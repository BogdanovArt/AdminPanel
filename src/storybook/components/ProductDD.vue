<template>
  <div class="dropdown-wrapper" ref="wrapper">
    <drop-down-input
      ref="input"
      v-bind="$props"
      :return-value="inputHandler"
      @blur="blurHandler"
      @focus="focusHandler"
    >
      <div class="drop-controls">
        <v-btn
          v-show="value"
          icon
          x-small
          title="Очистить"
          @click="clearClickHandler"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-btn icon x-small @click="expandClickHandler">
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </div>
    </drop-down-input>
    <template v-if="selectMultiple">
      HABA HABA
    </template>
    <transition name="fade">
      <template v-if="expanded">
        <drop-down-list
          ref="list"
          :title-key="titleKey"
          :items="items"
          :selected="selected"
          :select-multiple="selectMultiple"
          :return-value="itemSelectHandler"
          :on-scroll-end="scrollEndHandler"
          :loading="loading"
        />
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import { DropDown } from "@/components/inputs/DropDown";

interface SelectItem {
  id: number;
  name: string;
}

@Component({ name: "product-drop-down" })
export default class ProductDropDown extends DropDown<SelectItem> {

  saveDataHandler() {
    this.returnValue(
      this.name,
      this.selected,
    );
  }
}
</script>
