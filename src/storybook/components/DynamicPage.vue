<template>
  <div class="page-dispatcher">
    <error v-if="errors" :data="errors" />
    <template v-else-if="!!staticContent">
      <component
        :is="staticContent.data.data.type"
        :store-data="staticContent"
        :fetching="!modalContent && getFetchingState"
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
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Route } from "vue-router";

import Catalog from "./Catalog.vue";
import Product from "./Product.vue";
import Error from "@/components/common/Error.vue";
import PopUp from "./PopUp.vue";

import { PageTypes } from "@/store/modules/dynamic/interfaces";

@Component({
  components: {
    [PageTypes.TABLE]: Catalog,
    [PageTypes.FORM]: Product,
    Error,
    PopUp,
  },
})
export default class DynamicPage extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly storeData!: any;

  get staticContent() {
    return this.storeData.data.type === "static" ? this.storeData : null;
  }
  get modalContent() {    
    return this.storeData.data.type === "modal" ? this.storeData : null;
  }
  get popUpContent() {
    return this.storeData.data.type === "popup" ? this.storeData.data.data : null;
  }
  get getFetchingState() {
    return false;
  }
  get lastAction() {
    return {};
  }
  get errors() {
    return null;
  }

  @Watch("$route")
  routeWatcher(route: Route) {
    this.forceFetch(route);
  }

  closeModal() {
    alert("Действие при закрытии модального окна");
    // this.lastAction
    //   ? this.$router.push({ path: this.lastAction.route, query: this.lastAction.action.params })
    //   : dynamicStore.setModalData(null);
  }

  closePopUp() {
    // dynamicStore.setPopUpData(null);
  }

  forceFetch(route = this.$route) {
    // const action = {
    //   method: RMethods.GET,
    //   url: origin + apiRoot + route.path,
    //   params: route.query,
    // };
    // dynamicStore.fetchData({ action, route: this.$route.path });
  }

  routeFail() {
    // this.forceFetch();
    console.info("no same path routing");
  }

  routeSuccess() {
    // console.info(route)
  }

  mounted() {
    // this.forceFetch();
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
    z-index: 2;
    &__content {
      position: relative;
      padding: 20px;
      width: 80%;
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
