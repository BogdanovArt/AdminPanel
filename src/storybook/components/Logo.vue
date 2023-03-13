<template>
  <div class="Logo">
    <a href="https://www.google.com" target="_blank">
      GOOGLE
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
.Logo {
  display: flex;
  a {
    color: red;
  }
}
</style>
