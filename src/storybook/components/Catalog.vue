<template>
  <div class="catalog-page">
    <bread-crumbs
      v-if="getMeta && pageContext === 'static'"
      :list="getMeta.breadcrumbs"
    />

    <h1 v-if="getHeading" class="catalog-page__title">{{ getHeading }}</h1>

    <div class="catalog-page__controls">
      <SearchBar :handler="search" />
      <div v-if="tableControls" class="catalog-page__buttons">
        <template v-for="(button, index) in tableControls">
          <v-btn
            :key="index"
            dark
            elevation="0"
            :data-test="`data-table-button-${button.icon || 'default'}`"
            class="catalog-page__button"
            :style="button.style"
            @click="fetchHandler(button.action)"
          >
            <v-icon v-if="button.icon">
              {{ button.icon }}
            </v-icon>
            {{ button.title }}
          </v-btn>
        </template>
      </div>
    </div>

    <up-table
      :data="getTable"
      :selectable="false"
      :loading="fetching"
      :executor="fetchHandler"
      :controls="controls"
    />
    <div v-if="getPagination" class="catalog-page__controls">
      <pagination
        :total_pages="getPagination.total_pages"
        :current_page="getPagination.current_page"
        :routeHandler="paginator"
      />
      <per-page :handler="perPaginator" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import UpTable from "@/components/catalog/UpTable.vue";
import Pagination from "@/components/common/Pagination.vue";
import PerPage from "@/components/common/PerPage.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

import { dynamicStore } from "@/store";

import {
  ICatalogAction,
  ICatalogControls,
  ICatalogPage,
} from "@/store/modules/catalog/interfaces";
import { IPageMeta } from "@/store/interfaces";

import "vuetify/dist/vuetify.min.css";

interface CatalogPage {
  data: ICatalogPage;
  meta: IPageMeta;
}

@Component({
  components: {
    UpTable,
    Pagination,
    PerPage,
    SearchBar,
    BreadCrumbs,
  },
})
export default class Catalog extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  readonly storeData!: CatalogPage;

  get pageContext() {
    return this.storeData.data.type;
  }
  get getTable() {
    return this.storeData.data.data?.table;
  }
  get getMeta() {
    return this.storeData.meta;
  }
  get total() {
    return this.storeData.meta && this.storeData.meta.total;
  }
  get getHeading() {
    return this.storeData.meta && this.storeData.meta.h1;
  }
  get getTitle() {
    return this.storeData.meta && this.storeData.meta.title;
  }
  get getPagination() {
    return this.storeData.meta && this.storeData.meta.pagination;
  }
  get getFetchingState() {
    return dynamicStore.fetchingState;
  }

  get tableControls() {
    return this.getTable?.items
      .filter((item) => item.type === "button")
      .map((button) => {
        return button.data.find((col) => col.type === "name");
      });
  }

  fetchHandler(action: ICatalogAction) {
    alert(`действие: ${JSON.stringify(action)}`);
  }

  routeFail() {
    console.info("no same path routing");
  }

  routeSuccess() {
    // console.info(route)
  }

  controls(ctrl: ICatalogControls) {
    // 
  }

  paginator(num: number) {
    // 
  }

  perPaginator(num: number) {
    //
  }

  search(str: string) {
    alert(`поиск: ${str}`);
  }

  querySetter(name: string, value: string | number) {
    //
  }
}
</script>

<style lang="scss" scoped>
.catalog-page {
  &__title {
    margin: 10px 0;
  }
  &__buttons {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
  }
  &__button {
    text-transform: none;
    background-color: $main-color !important;
    i,
    span {
      line-height: 14px;
      margin-right: 5px;
    }
  }
}
.catalog-page__controls {
  display: flex;
  align-items: center;
  padding: 20px 0;
  > * {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
.page__placeholder {
  > * {
    margin-bottom: 20px;
    &.page__controls {
      display: flex;
      button {
        margin-right: 20px;
      }
    }
  }
}
.search-warning {
  margin: 0 0 20px 0;
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  border-radius: 2px;
  color: #818182;
}
</style>
