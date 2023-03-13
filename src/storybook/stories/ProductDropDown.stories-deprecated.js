import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import ProductDropDown from "../components/ProductDDstory.vue";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/4. Комплексные поля ввода/Динамический список товаров`,
  component: ProductDropDown,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const DropDownExample = (args, { argTypes }) => ({
  props: Object.keys(args),
  components: { ProductDropDown },
  template: `<ProductDropDown v-bind="$props" />`,
});

export const DD = DropDownExample.bind({});
DD.storyName = "Динамический список товаров";
DD.args = {
  type: "dropdown",
  name: "products",
  label: "Товары в комплекте",
  placeholder: "Выберите значение",
  disabled: false,
  listItems: [
    {
      id: 0,
      name: "Товар 224",
    },
    {
      id: 9,
      name: "Товар 9",
    },
    {
      id: 7,
      name: "Товар 7",
    },
    // {
    //   id: 6,
    //   name: "Товар 6",
    // },
    // {
    //   id: 5,
    //   name: "Товар 5",
    // },
    // {
    //   id: 8,
    //   name: "Товар 9",
    // },
    // {
    //   id: 4,
    //   name: "Товар 4",
    // },
    // {
    //   id: 2,
    //   name: "Товар 2",
    // },
    // {
    //   id: 19,
    //   name: "Товар 19",
    // },
    // {
    //   id: 17,
    //   name: "Товар 17",
    // },
    // {
    //   id: 18,
    //   name: "Товар 18",
    // },
    // {
    //   id: 13,
    //   name: "Товар 13",
    // },
    // {
    //   id: 11,
    //   name: "Товар 11",
    // },
    // {
    //   id: 12,
    //   name: "Товар 12",
    // },
    // {
    //   id: 10,
    //   name: "Товар 10",
    // },
    // {
    //   id: 1,
    //   name: "Товар 1",
    // },
    // {
    //   id: 16,
    //   name: "Товар 16",
    // },
    // {
    //   id: 15,
    //   name: "Товар 15",
    // },
    // {
    //   id: 14,
    //   name: "Товар 14",
    // },
    // {
    //   id: 3,
    //   name: "Товар 3",
    // },
  ],
  listSelected: [
    {
      id: 0,
      name: "Товар 224",
    },
  ],
  selectMultiple: false,
  enableAddition: false,
  endpoint: "",
};
