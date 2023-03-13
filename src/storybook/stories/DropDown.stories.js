import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import DropDown from "../components/DropDown.vue";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/4. Комплексные поля ввода/Динамический список`,
  component: DropDown,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const DropDownExample = (args, { argTypes }) => ({
  props: Object.keys(args),
  components: { DropDown },
  template: `<DropDown v-bind="$props" />`,
});

export const DD = DropDownExample.bind({});
DD.storyName = "Динамический список";
DD.args = {
  type: "dropdown",
  name: "parent_id",
  label: "Родительская категория",
  placeholder: "Выберите значение",
  disabled: false,
  listItems: [
    {
      id: 0,
      title: "Верхний раздел",
    },
    {
      id: 9,
      title: "Винодельная продукция",
    },
    {
      id: 7,
      title: "Животноводство",
    },
    {
      id: 6,
      title: "Зерновые",
    },
    {
      id: 5,
      title: "Кормовые культуры",
    },
    {
      id: 8,
      title: "КРС продукция",
    },
    {
      id: 4,
      title: "Молочная продукция",
    },
    {
      id: 2,
      title: "Овощи",
    },
    {
      id: 19,
      title: "-Капуста",
    },
    {
      id: 17,
      title: "-Картофель",
    },
    {
      id: 18,
      title: "-Морковь",
    },
    {
      id: 13,
      title: "Посевные культуры",
    },
    {
      id: 11,
      title: "Саженцы",
    },
    {
      id: 12,
      title: "Техника",
    },
    {
      id: 10,
      title: "Удобрения",
    },
    {
      id: 1,
      title: "Фрукты",
    },
    {
      id: 16,
      title: "-Апельсины",
    },
    {
      id: 15,
      title: "-Груши",
    },
    {
      id: 14,
      title: "-Яблоки",
    },
    {
      id: 3,
      title: "Ягоды",
    },
  ],
  listSelected: [
    {
      id: 0,
      title: "Верхний раздел",
    },
  ],
  selectMultiple: false,
  enableAddition: false,
  endpoint: "",
};
