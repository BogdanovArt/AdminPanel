<template>
  <div class="process--active" :title="item.title">
    <v-btn text icon>
      <v-icon small>cached</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "CtrlLoader",
    props: {
      item: {
        type: Object,
        default: () => ({}),
      }
    }
  }
</script>

<style lang="scss">
@keyframes spinme {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(-359deg);
  }
}
.process--active{
  animation: spinme 1s infinite;
}
</style>


