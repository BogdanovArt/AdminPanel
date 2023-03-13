<template>
  <form id="login-form" @keypress.enter="authRequest">
    <h1>Авторизация</h1>
    <template v-for="(el, ind) in inputs">
      <input-simple
        :key="ind"
        v-bind="el"
        ref="input"
        :returnValue="setFormData"
      />
    </template>
    <v-btn
      color="primary"
      width="100%"
      dark
      @click="authRequest"
      :disabled="disabled"
    >
      Войти
    </v-btn>
    <template v-if="userMessage">
      <v-divider></v-divider>
      <div class="user-message">
        {{ userMessage }}
      </div>
    </template>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { SimpleInput } from "@netex/inputs";

import { ResStatus, Routes } from "@/router/enums";
import { authStore }  from "@/store";
import { InputValue } from "@/store/interfaces";
import { IUserCredentials } from "@/store/modules/auth/interfaces";
import { IGenericResponse } from "@/router/interfaces";

interface IComponent extends Element {
  name: string;
  setError: (err: string) => void;
}

@Component({
  components: {
    "input-simple": SimpleInput,
  }
})
export default class AuthForm extends Vue {
  credentials: IUserCredentials = {
    phone: "",
    password: "",
  };
  userMessage = "Для доступа в административный раздел необходим аккаунт не ниже уровня доступа модератора";
  inputs = [
    {
      name: "phone",
      required: true,
      placeholder: "Номер телефона",
      mask: {
        value: "+7 (###) ###-##-##",
        errorMessage: "Некорректный телефон",
      },
      prefix: "+7 (",
    },
    {
      type: "password",
      name: "password",
      required: false,
      placeholder: "Пароль",
    },
  ];

  get disabled() {
    return !this.credentials.phone || !this.credentials.password;
  }
  setFormData(name: "phone" | "password" , value: InputValue) {
    const { credentials } = this;
    credentials[name] = value as string;
    this.credentials = credentials;
  }
  authRequest() {
    authStore.authenticate(this.credentials)
      .then((res: IGenericResponse) => {
        if (res.status === ResStatus.ERROR) {
          const pInput = this.getComponent("password");
          if (pInput) pInput.setError("Неверный логин или пароль");
        } else {
          this.$router.replace(Routes.HOME);
        }
      });
  }
  getComponent(name: string) {
    for (const ref of this.$refs.input as IComponent[]) {
      if (ref.name === name) return ref;
    }
  }
}
</script>

<style lang="scss" scoped>
#login-form {
  padding: 20px;
  background: #fff;
  max-width: 325px;
  border-radius: 5px;
  h1 {
    margin: 0 0 20px 0;
    text-align: center;
    font-size: 18px;
  }
  button {
    margin: 10px 0 ;
    &.v-btn--disabled {
      color: gray !important;
      &:before {
        opacity: .25;
      }
    }
  }
  .user-message {
    padding: 20px 0;
    font-size: 14px;
    color: #aaa;
    text-align: center;
  }
}
</style>
