<template>
  <div id="home-page" class="home-page">
    <BreadCrumbs :list="breadcrumbs" />
    <template v-if="content">
      <h1>{{ content.title }}</h1>
      <template v-if="content.items">
        <template v-if="hash">
          <template v-for="(link, index) in content.items">
            <div :key="index" class="home-page__links">
              <h3>{{ link.title }}</h3>
              <div class="home-page__links__items">
                <template v-for="(sub, index) in link.items">
                  <div :key="'sub' + index" class="home-page__link">
                    <big-link :title="sub.title" :link="sub.link" />
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="home-page__links__items">
            <template v-for="(link, index) in content.items">
              <div :key="index" class="home-page__link">
                <big-link :title="link.title" :link="link.link" />
              </div>
            </template>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BigLink from "./blocks/BigLink.vue";
import BreadCrumbs from "@/components/common/BreadCrumbs.vue";

import { layoutStore } from "@/store";
import { ILayoutPanel } from "@/store/modules/layout/interfaces";

@Component({ components: { BigLink, BreadCrumbs } })
export default class Home extends Vue {
  @Prop({ type: Array, default: () => [] })
  readonly mockStoreData: any;

  get navigation() {
    return this.mockStoreData?.length
      ? this.mockStoreData
      : layoutStore.panelData;
  }

  get hash() {
    return this.$route.hash;
  }

  get breadcrumbs() {
    return this.hash
      ? [
          {
            url: "/",
            icon: "mdi-home",
            name: "Главная",
          },
          {
            name: this.content?.title,
          },
        ]
      : [];
  }

  get content() {
    return this.getContentByHash(this.hash, this.navigation);
  }

  getContentByHash(
    hash: string,
    items?: ILayoutPanel[],
  ): ILayoutPanel | undefined {
    if (hash && items) {
      for (let i = 0; i <= items.length; i++) {
        if (items[i].link?.includes(hash)) {
          return items[i];
        } else if (items[i].items) {
          return this.getContentByHash(hash, items[i].items);
        }
      }
    } else if (items?.length) {
      if (items[0].link === "/") {
        items[0].items = items.slice(1);
      }
      return items[0];
    }
  }

  mounted() {
    document.title = "МТК | Управление сайтом";
  }
}
</script>

<style lang="scss">
#home-page {
  padding: 20px;
  h1 {
    margin-bottom: 20px;
  }
  .home-page {
    &__links {
      &__items {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
    }
  }
  > * {
    display: block;
  }
}
</style>
