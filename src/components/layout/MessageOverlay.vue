<template>
  <div :class="['overlay-container', show && 'overlay-visible']">
    <div class="overlay-background" :class="[]"></div>
    <div class="overlay-content" @click="$emit('close')">
      <template v-if="status === 'success'">
        <div class="overlay-status-icon status-success">
          <v-icon>mdi-check</v-icon>
        </div>
      </template>
      <template v-else>
        <div class="overlay-status-icon status-error">
          <v-icon>mdi-close</v-icon>
        </div>
      </template>
      <div class="response-message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { ResStatus } from "@/router/enums";

@Component
export default class MessageOverlay extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly show!: boolean;

  @Prop({ type: String, default: "" })
  readonly status!: ResStatus;

  @Prop({ type: String, default: "" })
  readonly message!: string;
}
</script>

<style lang="scss" scoped>
.overlay {
  &-container {
    position: fixed;
    display: flex !important;
    align-items: center;
    justify-content: center;
    inset: 0;
    z-index: 99;
    transition: $trns;
    pointer-events: none;
    opacity: 0;
  }
  &-visible {
    pointer-events: all;
    opacity: 1;
  }
  &-background {
    position: absolute;
    inset: 0;
    background: $bg-color;
    opacity: 0.5;
    z-index: 1;
  }
  &-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    z-index: 2;
    &:before {
      content: "";
      position: absolute;
      inset: 20px;
      border-radius: 50%;
      background: $bg-color;
      box-shadow: 0 0 100px 100px $bg-color;
      z-index: -1;
    }
  }
  &-status-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    &.status-success {
      background: $main-color;
    }
    &.status-error {
      background: $warning-color;
    }
    .v-icon {
      color: $bg-color;
    }
  }
}

.response-message {
  font-size: 18px;
}
</style>
