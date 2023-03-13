<template>
  <td @click="changeSort" :style="{ cursor: 'pointer' }">
    <div class="header-controls">
      <v-btn
        v-if="first"
        class="home-button"
        icon
        @click="goHome"
        title="Домой"
      >
        <v-icon color="rgba(0, 0, 0, 0.54)">mdi-home</v-icon>
      </v-btn>
      <span>{{ item.text }}</span>
      <span
        v-show="getControls"
        :class="[
          'sort-icon',
          item.sort && getControls.sort === item.sort && 'sort-active',
          item.sort &&
            getControls.sort === item.sort &&
            getControls.order === 'desc' &&
            'sort-descending',
          !item.sort && 'disabled',
        ]"
      >
        <v-icon>
          mdi-menu-down
        </v-icon>
      </span>
    </div>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import {
  ICatalogAction,
  ICatalogControls,
  ITableHeader,
} from "@/store/modules/catalog/interfaces";
import { SortOrders } from "@/store/enums";
import { Query } from "@/utils/interfaces";
import { RMethods } from "@/utils/enums";

@Component
export default class HeaderCell extends Vue {
  @Prop({ type: Object || undefined, default: undefined })
  readonly query?: Query;

  @Prop({ type: Object, default: () => ({}) })
  readonly item!: ITableHeader;

  @Prop({ type: Function, default: () => null })
  readonly trigger!: (ctrl: ICatalogControls) => void;

  @Prop({ type: Boolean, default: false })
  readonly first!: boolean;

  @Prop({ type: Function, default: () => null })
  readonly executor!: (action: ICatalogAction) => void;

  get defaultAction() {
    return {
      route: "/catalog",
      method: RMethods.GET,
    };
  }

  get getControls() {
    return this.query || this.$route.query;
  }

  goHome() {
    this.executor(this.defaultAction);
  }

  changeSort() {
    if (this.item.sort) {
      const ctrl = Object.assign({}, this.getControls) as ICatalogControls;
      if (this.item.sort === ctrl.sort) {
        switch (ctrl.order) {
          case SortOrders.ASC:
            ctrl.order = SortOrders.DESC;
            break;
          case SortOrders.DESC:
            ctrl.order = ctrl.sort = "";
            break;
          default:
            ctrl.order = SortOrders.ASC;
            break;
        }
      } else {
        ctrl.sort = this.item.sort;
        ctrl.order = SortOrders.ASC;
      }
      this.trigger(ctrl);
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  .header-controls {
    display: flex;
    align-items: center;
    height: 48px;
    .home-button {
      margin-left: -6px;
      margin-right: 12px;
    }
  }
  .sort-icon {
    display: inline-block;
    transition: 0.2s;
    i {
      color: #ccc;
    }
  }
  .sort-active {
    i {
      color: green;
    }
  }
  .sort-descending {
    transform: rotate(-180deg);
  }
  .disabled {
    display: none;
  }
}
</style>
