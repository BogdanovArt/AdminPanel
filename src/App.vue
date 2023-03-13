<template>
  <v-app>
    <v-main>
      <component :is="layout" :fetching="fetching">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Layout from "./layouts/index.vue";
import NoLayout from "./layouts/NoLayout.vue";

import { dynamicStore } from "./store";

import "./assets/scss/overrides.scss";
import "./assets/scss/globals.scss";

@Component({
  components: {
    Layout,
    NoLayout,
  },
})
export default class App extends Vue {
  get fetching() {
    return dynamicStore.fetching;
  }

  get layout() {
    return this.$route.meta.layout || "layout";
  }
}
</script>
