import "@/assets/scss/globals.scss";

import RadioInput from "../components/RadioStoryWrapper";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/4. Комплексные поля ввода/Радио`,
  component: RadioInput,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(args),
  components: { RadioInput },
  template: `<radio-input v-bind="$props" />`,
});

export const Check = StaticTemplate.bind({});
Check.storyName = "Радио";
Check.args = {
  type: "radio",
  name: "example-radio",
  value: "tag",
  disabled: false,
  label: "Пример радио-ввода",
  items: [
    {
      label: "Раздел",
      value: "category",
    },
    {
      label: "Тег",
      value: "tag",
    },
    {
      label: "Другой",
      value: "other",
    },
  ],
};
