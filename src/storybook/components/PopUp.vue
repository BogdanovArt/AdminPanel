<template>
  <div class="popup-data">
    <v-icon class="popup-data__close" @click="$emit('close')">mdi-close</v-icon>
    <h1 v-if="item.title">{{ item.title }}</h1>
    <div v-if="item.content" v-html="item.content" />
    <div v-if="item.buttons" class="popup-data__controls">
      <template v-for="(button, ind) in item.buttons">
        <v-btn
          :key="ind"
          :color="button.color"
          :outlined="button.dark"
          :icon="!button.title"
          dark
          class="popup-data__controls__button"
          @click="executeAction(button.action)"
        >
          <v-icon v-if="button.icon">{{ button.icon }}</v-icon>
          <span v-if="button.icon && button.title" class="popup-data__controls__spacer"></span>
          <span v-if="button.title">{{ button.title }}</span>
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { IPopUpData } from "@/store/interfaces";
import { ICatalogAction } from "@/store/modules/catalog/interfaces";

@Component
export default class Error extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly item!: IPopUpData;

  executeAction(action: ICatalogAction) {
    alert(`действие: ${JSON.stringify(action)}`);
  }
}
</script>

<style lang="scss" scoped>
.popup-data {
  &__controls {
    display: flex;
    grid-gap: 10px;
    &__button {
    }
    &__spacer {
      width: 8px;
    }
  }
  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
.v-btn {
  text-transform: none;
}
</style>
