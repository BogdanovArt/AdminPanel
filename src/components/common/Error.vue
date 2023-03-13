<template>
  <div class="error-page">
    <div class="error-content">
      <template v-if="data.status === 403 && User">
        <div class="error-info">
          Вы авторизованы от пользователя <b>{{ User.name }}</b
          >, который не имеет доступа к административной части. Для возврата в
          свою учетную запись пожалуйста нажмите кнопку
          <span @click="logoutUser" class="logout-button">"Выйти"</span>.
        </div>
      </template>
      <template v-else>
        При отправке запроса произошла ошибка, попробуйте обновить страницу или
        вернуться
        <a href="#" @click.prevent.stop="back">назад</a>
        <div class="error-info">
          <div>
            Код ошибки: <span class="error-info__code">{{ data.status }}</span>
          </div>
          <div>Информация об ошибке:</div>
          <div class="error-info__message">{{ data.data.errors }}</div>
        </div>
      </template>
    </div>
    <div class="error-underlay" @click="close"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { IErrors } from "@/store/modules/product/interfaces";
import { authStore, layoutStore, dynamicStore } from "@/store";

@Component
export default class Error extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  readonly data!: IErrors;

  get User() {
    return authStore.userData;
  }

  logoutUser() {
    authStore.logoutUser();
    this.refreshRoute();
  }

  refreshRoute() {
    layoutStore.fetchData();
    const { path, query } = this.$router.currentRoute;
    this.$router.replace("/");
    this.$router.replace({ path, query });
  }

  close() {
    dynamicStore.setErrors();
  }

  back() {
    this.close();
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.logout-button {
  cursor: pointer;
  color: $main-color;
}
.error {
  &-page {
    color: $text-color;
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    margin: 0 !important;
  }
  &-content {
    position: relative;
    padding: 24px;
    background: $bg-color;
    border-radius: 6px;
    z-index: 2;
  }
  &-underlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  &-button {
    margin-top: 16px;
  }
  &-info {
    color: $hint-color;
    padding: 15px;
    border: 1px solid $border-color;
    margin-top: 10px;
    background: $bg-color;
    max-width: 600px;
    &__code {
      font-weight: 600;
      color: $warning-color;
    }
    &__message {
      color: $warning-color;
      font-style: italic;
      max-height: calc(100vh - 200px);
      overflow: hidden;
    }
  }
}
</style>
