<template>
  <div>
    <div :class="['table-wrapper', selectable && 'table-modal']">
      <v-data-table
        data-test="data-table"
        :items="data.items"
        :headers="data.headers"
        hide-default-footer
        hide-default-header
        :loading="loading"
        :items-per-page="perPage"
      >
        <template v-slot:header="{ props: { headers } }">
          <template v-if="data.headers && data.headers.length">
            <tr>
              <template v-for="(el, i) in headers">
                <header-cell
                  :item="el"
                  :first="i === 0"
                  :key="i"
                  :trigger="controls"
                  :query="query"
                  :executor="executor"
                />
              </template>
            </tr>
            <tr>
              <td class="divider" />
            </tr>
          </template>
        </template>
        <!-- <v-progress-linear
          v-if="modal"
          v-slot:progress color="blue"
          indeterminate
        ></v-progress-linear> -->
        <template v-slot:body="{ items }">
          <draggable :list="items" tag="tbody" draggable=".draggable">
            <template v-for="(el, i) in items">
              <table-row
                :key="i"
                :item="el"
                :executor="executor"
                :class="data.dragAction && el.type === 'items' && 'draggable'"
              />
            </template>
          </draggable>
        </template>
      </v-data-table>
    </div>
    <div v-if="data.controls" class="table-actions">
      <cell-controls :item="{ items: data.controls }" :trigger="executor" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import draggable from "vuedraggable";

import TableRow from "@/components/catalog/table/TableRow.vue";
import HeaderCell from "@/components/catalog/table/headers/HeaderCell.vue";
import CellControls from "@/components/catalog/table/items/CellControls.vue";

import {
  ICatalogAction,
  ICatalogControls,
  ICatalogTable,
} from "@/store/modules/catalog/interfaces";
import { Query } from "@/utils/interfaces";

@Component({
  components: {
    TableRow,
    HeaderCell,
    CellControls,
    draggable,
  },
})
export default class UpTable extends Vue {
  perPage = 99999;

  @Prop({ type: Object, default: () => ({}) })
  readonly data!: ICatalogTable;

  @Prop({ type: Boolean, default: false })
  readonly selectable!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly modal!: boolean;

  @Prop({ type: Object || undefined, default: undefined })
  readonly query?: Query;

  @Prop({ type: Function, default: () => null })
  readonly controls!: (ctrl: ICatalogControls) => void;

  @Prop({ type: Function, default: () => null })
  readonly executor!: (action: ICatalogAction) => void;
}
</script>

<style lang="scss">
#app {
  .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: #f7f7f7 !important;
    .divider {
      opacity: 0;
    }
  }
  .table-actions {
    margin-top: 12px;
    margin-right: 130px;
    > * {
      padding: 6px;
      border: $border;
    }
  }
  .table-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    overflow: hidden;
    tr {
      &:not(:last-of-type) td {
        border-bottom: $border;
      }
      &:hover {
        background: #f4f4f4 !important;
      }
    }
    td {
      display: table-cell !important;
      position: relative;
      user-select: none;
      padding: 0 16px;
      &.row-divider {
        height: 1px;
        background: rgba(0, 0, 0, 0.12);
      }
    }
    .v-datatable__progress {
      height: 3px !important;
    }
    .actions {
      > * {
        display: flex;
        align-items: center;
      }
      min-width: 230px;
      button {
        margin: 6px 2px;
        color: rgba(0, 0, 0, 0.54) !important;
        .v-btn__content {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .v-input--selection-controls__input {
        transform: scale(0.75);
      }
      .v-input--selection-controls {
        margin: 0;
        padding: 0;
      }
      .v-input__control {
        .v-messages {
          display: none;
        }
        .v-input__slot {
          margin-bottom: 0 !important;
        }
        label {
          font-size: 12px;
        }
      }
    }
    .dense {
      padding: 0 18px !important;
    }
    .table-row-names {
      width: 100%;
      cursor: pointer;
    }
    .table-controls {
      width: 100%;
      .checkbox-select {
        padding-left: 8px;
        label {
          white-space: nowrap;
        }
      }
    }

    .table-cell-names {
      display: flex;
      align-items: center;
    }
    .table-links {
      cursor: pointer;
      .linked {
        color: rgb(0, 153, 204);
      }
      .unlinked {
        color: orangered;
      }
    }
    .disabled {
      cursor: default;
      &:hover {
        // background: #f9f9f9;
        opacity: 0.75;
      }
    }
  }

  .table-links {
    min-width: 400px;
  }
  .row {
    &-breadcrumbs {
      position: relative;
      background-color: #f4f4f451;
    }
    &-chevron {
      left: 16px;
      bottom: -12px;
      position: absolute;
    }
  }
  .divider {
    position: absolute;
    right: -2px;
    color: rgba(0, 0, 0, 0.12);
  }
  .table-icon {
    display: inline-block;
    margin-right: 18px;
  }
}
</style>
