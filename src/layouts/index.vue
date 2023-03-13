<template>
  <div id="workspace">
    <AuthPanel v-if="savedUser" :name="activeUser.name" :logout="logoutUser" />

    <page-header :data="header">
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </page-header>

    <panel :data="panel" :header="header" />

    <div id="content">
      <Error v-if="errors" :data="errors" />
      <FetchOverlay :fetching="fetching" />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Error from "@/components/common/Error.vue";
import Panel from "@/components/layout/panel.vue";
import pageHeader from "@/components/layout/header.vue";
import AuthPanel from "@/components/layout/AuthPanel.vue";
import FetchOverlay from "@/components/layout/FetchOverlay.vue";

import { Storage } from "@/utils";

import { authStore, dynamicStore, layoutStore } from "@/store";

const LSKey = "ADM_FOCUS";

@Component({
  components: {
    Error,
    Panel,
    pageHeader,
    AuthPanel,
    FetchOverlay,
  },
})
export default class Layout extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;

  get header() {
    return layoutStore.headerData;
  }

  get panel() {
    return layoutStore.panelData;
  }

  get errors() {
    return dynamicStore?.pageErrors;
  }

  get savedUser() {
    return authStore.getSavedUser;
  }

  get activeUser() {
    return authStore.getUser || {};
  }

  logoutUser() {
    authStore.logoutUser();
    this.refreshRoute();
  }

  refreshRoute() {
    layoutStore.fetchData();
    const { path, query } = this.$router.currentRoute;
    this.$router.replace("/");
    this.$router.replace({ path, query });
  }

  setWindowEvents() {
    if (!localStorage.getItem(LSKey)) {
      // to prevent HMR from adding multiple events
      window.addEventListener("focus", this.checkAuthMode);
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem(LSKey);
      });
      localStorage.setItem(LSKey, "true");
    }
  }

  checkAuthMode() {
    const SAVED_USER = localStorage.getItem(Storage.SAVED_USER);

    if (this.savedUser && !SAVED_USER) {
      authStore.setSavedUser(null);
      this.refreshRoute();
    }
  }

  created() {
    this.setWindowEvents();
    const USER = localStorage.getItem(Storage.USER);
    const SAVED_USER = localStorage.getItem(Storage.SAVED_USER);

    USER && authStore.setActiveUser(JSON.parse(USER));
    SAVED_USER && authStore.setSavedUser(JSON.parse(SAVED_USER));

    layoutStore.fetchData();
  }
}
</script>

<style lang="scss" scoped>
#content {
  position: relative;
}
</style>
