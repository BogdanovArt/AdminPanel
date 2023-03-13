<template>
  <div>
    <v-navigation-drawer
      id="nav-panel"
      v-if="data"
      :mini-variant="mini"
      :width="sublist.length ? 500 : 250"
      permanent
    >
      <div class="event-wrapper" @mouseenter="onEnter" @mouseleave="onLeave">
        <div :class="[sublist.length && 'main-list--extended', 'main-list']">
          <v-list-item dense class="item-main">
            <v-icon class="menu-icon" @click="mini = !mini">mdi-menu</v-icon>
            <v-list-item-title>{{ header.title }}</v-list-item-title>

            <v-btn icon @click.stop="onClick">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider></v-divider>

          <v-list v-if="data.length" dense>
            <template v-for="item in data">
              <div
                class="router-link"
                :to="item.link"
                :key="item.title"
                @click="listAction(item)"
              >
                <v-list-item link class="nav-item">
                  <v-icon>{{ item.icon }}</v-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </div>
            </template>
          </v-list>
        </div>
        <div class="sub-list" v-if="sublist.length">
          <v-list-item dense class="item-main">
            <v-list-item-title>{{ active.title }}</v-list-item-title>

            <v-btn icon @click.stop="onClick">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <template v-for="el in sublist">
              <div class="sub-list__title" :to="el.link" :key="el.linl">
                <v-list-item link class="nav-item">
                  <v-list-item-title>{{ el.title }}</v-list-item-title>
                </v-list-item>
              </div>
              <v-list
                :key="'sub-' + el.title"
                v-if="el.items && el.items.length"
                dense
                class="sub-list__list"
              >
                <template v-for="subItem in el.items">
                  <div
                    class="router-link"
                    :to="subItem.link"
                    :key="subItem.title"
                    @click="listAction(subItem)"
                  >
                    <v-list-item link class="nav-item">
                      <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item>
                  </div>
                </template>
              </v-list>
            </template>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
    <transition name="fade">
      <div v-if="!mini" class="overlay" @click="onClick"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

import { ILayoutHeader, ILayoutPanel } from "@/store/modules/layout/interfaces";

import { Routes } from "@/router/enums";

@Component
export default class NavPanel extends Vue {
  mini = true;
  inside = false;
  enterTimer = 0;
  leaveTimer = 0;
  active: ILayoutPanel | null = null;

  @Prop({ type: Array, default: () => [] })
  readonly data!: ILayoutPanel[];

  @Prop({ type: Object, default: () => ({}) })
  readonly header!: ILayoutHeader;

  get sublist() {
    return this.active?.items ? this.active.items : [];
  }

  @Watch("$route")
  routeWatcher() {
    this.mini = true;
    this.closeSub();
    clearTimeout(this.enterTimer);
  }

  closeSub(state?: boolean) {
    if (!state) this.active = null;
  }

  onEnter() {
    this.inside = true;
    clearTimeout(this.enterTimer);
    this.enterTimer = setTimeout(() => {
      if (this.inside) this.mini = false;
    }, 500);
  }

  onLeave() {
    this.inside = false;
    clearTimeout(this.leaveTimer);
    this.leaveTimer = setTimeout(() => {
      if (!this.inside) {
        this.mini = true;
        this.closeSub();
      }
    }, 1000);
  }

  onClick() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.mini = true;
    this.closeSub();
  }

  listAction(item: ILayoutPanel) {
    if (item.items && item.link !== Routes.HOME) {
      // console.warn("open", item.items);
      this.active = item;
    } else if (item.link) {
      this.$router.push(item.link);
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.event-wrapper {
  height: 100%;
  display: flex;
}
.overlay {
  z-index: 19;
}
aside#nav-panel {
  position: fixed;
  height: 100%;
  z-index: 20;
  .item-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 80px;
    max-width: 100%;
    .v-list-item__title {
      font-size: 16px;
    }
    .menu-icon {
      cursor: pointer;
      color: $main-color;
    }
  }
  .main-list {
    position: relative;
    z-index: 2;
    &--extended {
      box-shadow: $shadow-main;
    }
  }
  .sub-list {
    width: 100%;
    background: #fcfcfc;
    .item-main {
      .v-list-item__title {
        color: $main-color;
      }
      button {
        color: $main-color;
      }
    }
    &__list {
      padding: 0;
    }
    &__title {
      .v-list-item__title {
        color: $hint-color;
        font-weight: 600;
      }
    }
  }
  .item-logo {
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .v-divider {
    margin: 0 20px 0 10px;
  }
  .nav-item {
    max-width: 100%;
    justify-content: flex-start;
    padding: 0 18px;
  }
  .router-link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    i {
      margin-right: 10px;
      color: $main-color;
    }
    .v-list-item__title {
      display: block;
      color: $main-color;
    }
  }
}
aside#nav-panel.v-navigation-drawer--mini-variant {
  width: 60px !important;
}
</style>
