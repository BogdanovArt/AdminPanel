<template>
  <router-link
    :data-test="`page-link${name}`"
    :to="link"
  >
    <v-btn width="344" dark>
      {{ title }}
    </v-btn>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BigLink extends Vue {
  @Prop({ type: String, default: "" })
  readonly title!: string;

  @Prop({ type: String, default: "" })
  readonly link!: string;

  get name() {
    return this.link.replaceAll("/", "-").replace("#", "");
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  button.v-btn {
    height: 200px !important;
    background-color: $main-color !important;
  }
}
</style>
