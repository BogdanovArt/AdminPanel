import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import SimpleInput from "../components/Simple";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/3. Текстовые поля ввода/Простой`,
  component: SimpleInput,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SimpleInput },
  template: `<SimpleInput v-bind="$props" />`,
});

export const Simple = StaticTemplate.bind({});
Simple.storyName = "Простой";
Simple.args = {
  type: "text",
  name: "name",
  value: "Значение по-умолчанию",
  placeholder: "Введите название раздела",
  label: "Название раздела",
  disabled: false,
};
