<template>
  <div class="auth-panel">
    <v-icon size="25" color="red">mdi-alert-circle-outline</v-icon>
    Вы авторизованы как <span class="auth-panel__user">{{ name }}</span>
    <v-btn @click="logout">выйти</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AuthPanel extends Vue {
  @Prop({ type: String, default: "" }) readonly name!: string;
  @Prop({ type: Function, default: () => null }) readonly logout!: () => void;
}
</script>

<style lang="scss" scoped>
.auth-panel {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 20px;
  top: 20px;
  right: 20px;
  padding: 15px 30px;
  box-shadow: $shadow-main;
  border-radius: 6px;
  background: #fff;
  z-index: 2;
  &__user {
    font-weight: bold;
  }
}
</style>
