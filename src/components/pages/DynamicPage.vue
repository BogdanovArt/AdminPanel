<template>
  <div class="page-dispatcher">
    <portal-target name="page-modal"></portal-target>
    <template v-if="!!staticContent">
      <component
        :is="staticContent.data.data.type"
        :store-data="staticContent"
        :action-handler="actionHandler"
        :query-handler="queryHandler"
        :errors="errors"
        :fetching="!modalContent && getFetchingState"
        :query="$route.query"
      />
    </template>
    <template v-else>
      <v-skeleton-loader type="heading" />
      <v-skeleton-loader type="image" style="margin-top: 20px" />
      <div class="page__controls">
        <v-skeleton-loader type="button" />
        <v-skeleton-loader type="button" />
        <v-skeleton-loader type="button" />
      </div>
    </template>
    <template v-if="!!modalContent">
      <div class="page-dispatcher__modal">
        <div class="page-dispatcher__modal__overlay" @click="closeModal"></div>
        <div class="page-dispatcher__modal__content">
          <component
            :is="modalContent.data.data.type"
            :store-data="modalContent"
            :fetching="getFetchingState"
          />
        </div>
      </div>
    </template>
    <template v-if="!!popUpContent">
      <div class="page-dispatcher__popup">
        <div class="page-dispatcher__popup__overlay" @click="closePopUp"></div>
        <div class="page-dispatcher__popup__content">
          <PopUp :item="popUpContent" @close="closePopUp" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { PortalTarget } from "portal-vue";

import Catalog from "@/components/pages/Catalog.vue";
import Product from "@/components/pages/Product.vue";
import PopUp from "@/components/common/PopUp.vue";

import { origin, setQuery } from "@/utils";
import { authStore, dynamicStore, layoutStore } from "@/store";

import { apiRoot, QueryParams } from "@/router/enums";
import { RMethods } from "@/utils/enums";
import { PageTypes } from "@/store/modules/dynamic/interfaces";
import { ICatalogAction } from "@/store/modules/catalog/interfaces";
import { Query } from "@/utils/interfaces";

@Component({
  components: {
    [PageTypes.TABLE]: Catalog,
    [PageTypes.FORM]: Product,
    PopUp,
    PortalTarget,
  },
})
export default class DynamicPage extends Vue {
  get staticContent() {
    return dynamicStore.StaticContent;
  }
  get modalContent() {
    return dynamicStore.ModalContent;
  }
  get popUpContent() {
    return dynamicStore.PopUpContent;
  }
  get getFetchingState() {
    return dynamicStore.fetchingState;
  }
  get lastAction() {
    return dynamicStore.lastAction;
  }
  get errors() {
    return dynamicStore?.pageErrors;
  }

  @Watch("$route")
  routeWatcher(route: Route) {
    this.forceFetch(route);
  }

  closeModal() {
    this.lastAction
      ? this.$router.push({
          path: this.lastAction.route,
          query: this.lastAction.action.params,
        })
      : dynamicStore.setModalData(null);
  }

  closePopUp() {
    dynamicStore.setPopUpData(null);
  }

  refreshRoute() {
    layoutStore.fetchData();
    const { path, query } = this.$router.currentRoute;
    this.$router.replace("/");
    this.$router.replace({ path, query });
  }

  async forceFetch(route = this.$route) {
    const action = {
      method: RMethods.GET,
      url: origin + apiRoot + route.path,
      params: route.query,
    };
    await dynamicStore.fetchData({ action, route: this.$route.path });
  }

  resetQuery(query: Query) {
    delete query[QueryParams.PAGE];
    delete query[QueryParams.QUERY];
    delete query.sort;
    delete query.order;
  }

  async actionHandler(action: ICatalogAction) {
    const { query } = this.$route;

    switch (true) {
      case action.url?.includes("auth"):
        await authStore.masterAuth(action);
        this.refreshRoute();
        break;
      case !!action.route:
        this.resetQuery(query);
        this.$router.push(
          { path: action.route, query },
          this.routeSuccess,
          this.routeFail,
        );
        break;
      default:
        action.params = { ...action.params, ...query };
        return await dynamicStore.fetchData({
          action,
          route: this.$route.path,
        });
    }
  }

  queryHandler(name: string, value: string) {
    const { query, path } = this.$route;
    const q = setQuery({ name, value, query });
    this.$router.replace({ path, query: q }, this.routeSuccess, this.routeFail);
  }

  routeFail() {
    this.forceFetch();
    console.info("no same path routing");
  }

  routeSuccess() {
    // console.info(route)
  }

  mounted() {
    this.forceFetch();
  }
}
</script>

<style lang="scss" scoped>
.page-dispatcher {
  > * {
    margin: 20px;
    &.page__controls {
      display: flex;
      > * {
        margin-right: 20px;
      }
    }
  }
  &__modal,
  &__popup {
    position: fixed;
    display: flex;
    justify-content: flex-end;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: 0;
    &__content {
      position: relative;
      padding: 20px;
      width: 900px;
      background: $bg-color;
      overflow: auto;
      z-index: 2;
    }
    &__overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.25);
      z-index: 1;
      cursor: pointer;
    }
  }
  &__popup {
    align-items: center;
    justify-content: center;
    z-index: 30;
    &__content {
      width: auto;
      border-radius: 4px;
    }
  }
}
</style>
