<template>
  <div id="fetching" :class="['fetching', fetching && 'fetching--active']">
    <v-progress-circular indeterminate />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;
}
</script>

<style lang="scss" scoped>
#fetching {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  background: #ffffff80;
  z-index: 10;
  color: $main-color !important;
}

.fetching {
  transition: opacity 500ms;
  opacity: 0;
  pointer-events: none;
  &--active {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
