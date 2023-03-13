<template>
  <div class="control-button">
    <v-btn
      :title="tooltip"
      :dark="dark"
      :color="color"
      elevation="0"
      data-glob="control-button"
      :data-icon="!title && 'icon-button'"
      :class="[!title && 'icon-button']"
      @click="$emit('click')"
    >
      <template v-if="icon">
        <v-icon>{{ icon }}</v-icon>
      </template>
      <template v-if="title">
        {{ title }}
      </template>
      <slot></slot>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({ type: String, default: "" })
  readonly icon!: string;

  @Prop({ type: String, default: "" })
  readonly tooltip!: string;

  @Prop({ type: Boolean, default: false })
  readonly dark!: boolean;

  @Prop({ type: String, default: "" })
  readonly title!: string;

  @Prop({ type: String, default: "" })
  readonly color!: string;
}
</script>

<style lang="scss" scoped>
.control-button {
  button[data-glob="control-button"] {
    height: 40px;
  }
  button[data-icon="icon-button"] {
    padding: 0;
    min-width: 40px;
  }
}
</style>
