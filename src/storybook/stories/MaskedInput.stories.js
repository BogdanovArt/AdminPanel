import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import MaskedInput from "../components/Masked";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/3. Текстовые поля ввода/С Маской`,
  component: MaskedInput,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MaskedInput },
  template: `<MaskedInput v-bind="$props" />`,
});

export const Input = StaticTemplate.bind({});
Input.storyName = "С Маской";
Input.args = {
  type: "text",
  name: "phone",
  required: true,
  disabled: false,
  value: "",
  label: "Номер телефона",
  placeholder: "Введите номер телефона",
  mask: {
    value: "+7 (###) ###-##-##",
    errorMessage: "Некорректный телефон",
  },
  prefix: "+7 (",
};
