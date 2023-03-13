<template>
  <header>
    <template v-if="$scopedSlots.logo">
      <div class="header__start">
        <slot name="logo"></slot>
      </div>
    </template>
    <div class="header__controls">
      <portal-target name="header-controls"></portal-target>
    </div>
    <div class="header__user-credentials">
      <span class="header__user-credentials_name">{{ username }}</span>
      <v-btn elevation="0" dark fab small @click="exit">
        <v-icon>
          mdi-exit-to-app
        </v-icon>
      </v-btn>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PortalTarget } from "portal-vue";

import { authStore } from "@/store";
import { Routes } from "@/router/enums";

import { ILayoutHeader } from "@/store/modules/layout/interfaces";

@Component({ components: { PortalTarget } })
export default class PageHeader extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: ILayoutHeader;

  get username() {
    return authStore.userData?.name;
  }

  exit() {
    authStore.logout();
    this.$router.push(Routes.LOGIN);
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px;
  height: 81px;
  border-bottom: 1px solid $border-color;
  background-color: $bg-color;
  button {
    background-color: $main-color !important;
  }
}
.header-logo__image {
  margin-right: 10px;
  img {
    display: block;
    height: 50px;
  }
}
.header-logo {
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $main-color;
    transition: 0.25s;
  }
  &:hover {
    a {
      color: #000;
    }
  }
}
.header__start {
  flex: 1;
}
.header__controls {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 20px;
}
.header__user-credentials {
  display: flex;
  align-items: center;
}
.header__user-credentials_name {
  display: inline-block;
  margin-right: 20px;
}
</style>
