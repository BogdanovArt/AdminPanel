<template>
  <div
    class="no-layout"
    :style="{
      height: '100%'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'NoLayout'
})
</script>
