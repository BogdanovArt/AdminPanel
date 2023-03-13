import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import InputComponent from "../components/Float";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/3. Текстовые поля ввода/Числовой`,
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
Input.storyName = "Числовой";
Input.args = {
  type: "text",
  name: "float-example",
  value: "",
  placeholder: "Введите числовое значение",
  label: "Float значение",
  rules: "nullable|numeric",
  disabled: false,
  required: true,
};
