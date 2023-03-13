<template>
  <div class="auth-page" style="background: url('./static/bg.jpg');">
    <auth-form />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AuthForm from "@/components/forms/AuthForm.vue";

@Component({
  components: {
    AuthForm,
  },
})
export default class Auth extends Vue {
  mounted() {
    document.title = "Авторизация | Управление сайтом";
  }
}
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
