<template>
  <div v-if="total_pages > 1" class="controls-pagination" style="padding: 0;">
    <div
      :class="['prev', current_page < 2 && 'disabled']"
      @click="current_page > 1 && routeHandler(current_page - 1)"
    >
      <v-icon>
        mdi-menu-left
      </v-icon>
    </div>
    <div class="controls-pagination__pages">
      <div
        v-if="total_pages > 5 && current_page > 3"
        :class="['controls-pagination__page']"
        @click="routeHandler(1)"
      >
        ...
      </div>
      <div
        v-for="n in visible"
        :key="n"
        :class="[
          'controls-pagination__page',
          n === current_page && 'page-active',
        ]"
        @click="routeHandler(n)"
      >
        {{ n }}
      </div>
      <div
        v-if="total_pages > 5 && total_pages - current_page >= 3"
        :class="['controls-pagination__page']"
        @click="routeHandler(total_pages)"
      >
        ...
      </div>
    </div>
    <div
      :class="['next', current_page >= total_pages && 'disabled']"
      @click="current_page < total_pages && routeHandler(current_page + 1)"
    >
      <v-icon>
        mdi-menu-right
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    current_page: { type: Number, default: 1 }, // eslint-disable-line
    total_pages: { type: Number, default: 1 }, // eslint-disable-line
    max: { type: Number, default: 5 },
    routeHandler: { type: Function, default: () => null },
  },
  computed: {
    visible() {
      if (this.total_pages > 5) {
        if (this.current_page <= 3) {
          return 4;
        } else if (this.total_pages - this.current_page <= 2) {
          return [
            this.total_pages - 3,
            this.total_pages - 2,
            this.total_pages - 1,
            this.total_pages,
          ];
        } else {
          return [
            this.current_page - 1,
            this.current_page,
            this.current_page + 1,
          ];
        }
      } else {
        return this.total_pages;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.controls-pagination {
  display: inline-flex;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid $border-color;
  align-items: stretch;
  background: #fff;
  * {
    user-select: none;
  }
  .page-active {
    background: $main-color;
    color: #fff;
  }
  .prev,
  .next {
    position: relative !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-width: 36px;
    transition: 0.2s;
    i {
      color: $main-color;
    }
    &:hover {
      background: $main-color;
      &:before {
        visibility: hidden;
      }
      i {
        color: #fff;
      }
    }
    &:before {
      content: "";
      position: absolute;
      background: #d3d3d3;
      height: calc(100% - 20px);
      width: 1px;
    }
  }
  .prev:before {
    right: 0;
  }
  .next:before {
    left: 0;
  }
  &__pages {
    display: inline-flex;
  }
  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    height: 40px;
    width: 40px;
    text-align: center;
    cursor: pointer;
    &:not(.page-active):hover {
      /*background: #02a676;*/
      color: $main-color;
    }
    @media only screen and (max-width: 768px) {
      // flex-basis: calc(100%/5);
      // max-width: calc(100%/5);
    }
  }
  @media only screen and (max-width: 768px) {
    // width: 100%;
    .prev,
    .next {
      flex-basis: calc(100% / 7);
      max-width: calc(100% / 7);
    }
    &__pages {
      flex-grow: 1;
    }
  }
  .disabled {
    background: #fff !important;
    i {
      color: #ebebeb !important;
    }
    &:before {
      visibility: hidden !important;
    }
  }
}
</style>
