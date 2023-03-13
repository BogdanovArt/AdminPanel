import "@/assets/scss/globals.scss";

import CBox from "../components/Checkbox";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/4. Комплексные поля ввода/Чекбокс`,
  component: CBox,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(args),
  components: { CBox },
  template: `<c-box v-bind="$props" />`,
});

export const Check = StaticTemplate.bind({});
Check.storyName = "Чекбокс";
Check.args = {
  type: "checkbox",
  name: "example-checkbox",
  checked: true,
  label: "Пример чекбокса",
};
