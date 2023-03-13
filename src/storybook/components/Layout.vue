<template>
  <div id="workspace">
    <page-header :data="header">
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </page-header>
    <panel :data="panel" :header="header" />
    <div id="content">
      <FetchOverlay :fetching="fetching" />
      <!-- <dynamic-page :store-data="{ data: {}, meta: {} }" /> -->
      <home-page :mock-store-data="panel" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Portal } from "portal-vue";

import Panel from "@/components/layout/panel.vue";
import pageHeader from "@/components/layout/header.vue";
import FetchOverlay from "@/components/layout/FetchOverlay.vue";
import HomePage from "@/components/pages/Home/index.vue";

import DynamicPage from "./DynamicPage.vue";

import { ILayoutHeader, ILayoutPanel } from "@/store/modules/layout/interfaces";

interface LayoutData {
  data: { header: ILayoutHeader; navPanel: ILayoutPanel[] };
}

@Component({
  name: "Layout",
  components: {
    Panel,
    pageHeader,
    DynamicPage,
    Portal,
    FetchOverlay,
    HomePage,
  },
})
export default class Layout extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly menu!: LayoutData;

  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;

  get header() {
    return this.menu?.data?.header;
  }

  get panel() {
    return this.menu?.data?.navPanel;
  }
}
</script>

<style lang="scss">
body {
  padding: 0 !important;
}
.input-story {
  padding: 20px;
}
#content {
  position: relative;
}
</style>
