import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import InputComponent from "../components/Validations";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/3. Текстовые поля ввода/Комплексная валидация`,
  component: InputComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { InputComponent },
  template: `<InputComponent v-bind="$props" />`,
});

export const Input = StaticTemplate.bind({});
Input.storyName = "Комплексная валидация";
Input.args = {
  type: "text",
  name: "email",
  placeholder: "Введите E-mail",
  label: "Электронная почта",
  value: "",
  required: true,
  disabled: false,
  allowedCharacters: "^[a-zA-Z0-9;_^'!@.#$%&*+=/?{}|~`-]+$",
  regex: {
    errorMessage: "Некорректный E-mail",
    value:
      '^(([^<>()[\\].,:\\s@"]+(\\.[^<>()[\\].,:\\s@"]+)*)|(".+"))@(([^<>()[\\].,:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$',
  },
  min: {
    value: 12,
    errorMessage: "Слишком короткий E-mail",
  },
  max: {
    value: 36,
    errorMessage: "Слишком длинный E-mail",
  },
};
