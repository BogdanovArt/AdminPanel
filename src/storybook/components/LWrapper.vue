<template>
  <div>
    <Layout :menu="menu" :fetching="fetching">
      <template v-slot:logo>
        <Logo />
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Layout from "./Layout.vue";
import Logo from "./Logo.vue";

@Component({
  name: "LWrapper",
  components: {
    Layout,
    Logo,
  },
})
export default class LayoutWrapper extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly menu!: any;

  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;
}
</script>
