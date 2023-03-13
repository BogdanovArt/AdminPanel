<template>
  <div class="catalog-page">
    <bread-crumbs
      v-if="getMeta && pageContext === 'static'"
      :list="getMeta.breadcrumbs"
      :executor="actionHandler"
    />

    <h1 v-if="getHeading">{{ getHeading }}</h1>

    <div class="catalog-page__controls">
      <search-bar :handler="search" :query="query.q" />

      <div v-if="tableControls" class="catalog-page__buttons">
        <template v-for="(button, index) in tableControls">
          <v-btn
            :key="index"
            dark
            elevation="0"
            :data-test="`data-table-button-${button.icon || 'default'}`"
            class="catalog-page__button"
            :style="button.style"
            @click="actionHandler(button.action)"
          >
            <v-icon v-if="button.icon">
              {{ button.icon }}
            </v-icon>
            {{ button.title }}
          </v-btn>
        </template>
      </div>
    </div>

    <div v-if="total && total >= 50" class="search-warning">
      Найдено товаров - {{ total }}. Уточните запрос, чтобы найти интересующий
      Вас товар.
    </div>
    <up-table
      :data="getTable"
      :selectable="false"
      :loading="fetching"
      :executor="actionHandler"
      :controls="controls"
      :query="query"
    />

    <div v-if="getPagination" class="catalog-page__controls">
      <pagination
        :total_pages="getPagination.total_pages"
        :current_page="getPagination.current_page"
        :routeHandler="paginator"
      />
      <!-- добавить общее кол-во и текущую страницу после модификации бекенда -->
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

import {
  CatalogParams,
  ICatalogAction,
  ICatalogControls,
  ICatalogPage,
} from "@/store/modules/catalog/interfaces";
import { QueryParams } from "@/router/enums";
import { IPageMeta } from "@/store/interfaces";
import { Query } from "@/utils/interfaces";

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

  @Prop({ type: Object || undefined, default: undefined })
  readonly query?: Query;

  @Prop({ type: Object, default: () => ({}) })
  readonly storeData!: CatalogPage;

  @Prop({ type: Function, default: () => null })
  readonly queryHandler!: (name: string, value: string) => void;

  @Prop({ type: Function, default: () => null })
  readonly actionHandler!: (action: ICatalogAction) => Promise<void>;

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

  get tableControls() {
    return this.getTable?.items
      .filter(item => item.type === "button")
      .map(button => {
        return button.data.find(col => col.type === "name");
      });
  }

  routeFail() {
    console.info("no same path routing");
  }

  routeSuccess() {
    // console.info(route)
  }

  controls(ctrl: ICatalogControls) {
    const params = Object.keys(ctrl);
    params.forEach(key => {
      const name = key as CatalogParams;
      this.queryHandler(name, ctrl[name]);
    });
  }

  paginator(num: number) {
    this.queryHandler(QueryParams.PAGE, num.toString());
  }

  perPaginator(num: number) {
    this.queryHandler(QueryParams.PER_PAGE, num.toString());
  }

  search(str: string) {
    this.queryHandler(QueryParams.QUERY, str);
  }
}
</script>

<style lang="scss" scoped>
.catalog-page {
  &__buttons {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
  }
  &__button {
    text-transform: none;
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
