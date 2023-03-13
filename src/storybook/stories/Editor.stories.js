import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import InputComponent from "../components/Editor";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/4. Комплексные поля ввода/Редактор HTML`,
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
Input.storyName = "Редактор HTML";
Input.args = {
  type: "textarea",
  name: "editor",
  label: "Редактор html",
  value: "<h2>ЗАГОЛОВОК</h2>"
};
