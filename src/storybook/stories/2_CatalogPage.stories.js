import "@/assets/scss/globals.scss";
import "@/assets/scss/overrides.scss";

import "@/plugins/v-mask";

import docs from "./docs/Pages.mdx";

import DynamicPage from "../components/DynamicPage";
import HomePageComponent from "@/components/pages/Home/index.vue";

import {
  tablePageMockData,
  formPageMockData,
  popupMockData,
  menuMockData,
} from "./consts";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/2. Страницы`,
  component: DynamicPage,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DynamicPage },
  template: `<DynamicPage v-bind="$props" />`,
});

// console.log(JSON.stringify(tablePageMockData));

export const Table = StaticTemplate.bind({});
const StaticData = JSON.parse(JSON.stringify(tablePageMockData));
Table.storyName = "Таблица (Статичная)";
Table.args = {
  storeData: StaticData,
};

export const Modal = StaticTemplate.bind({});
const ModalData = JSON.parse(JSON.stringify(tablePageMockData));
ModalData.data.type = "modal";
Modal.storyName = "Таблица (Модальная)";
Modal.args = {
  storeData: ModalData,
};

export const Form = StaticTemplate.bind({});
const StaticForm = JSON.parse(JSON.stringify(formPageMockData));
Form.storyName = "Форма (Статичная)";
Form.args = {
  storeData: StaticForm,
};

export const FormModal = StaticTemplate.bind({});
const ModalForm = JSON.parse(JSON.stringify(formPageMockData));
ModalForm.data.type = "modal";
FormModal.storyName = "Форма (Модальная)";
FormModal.args = {
  storeData: ModalForm,
};

export const PopUpModal = StaticTemplate.bind({});
const PopUpData = JSON.parse(JSON.stringify(popupMockData));
PopUpData.data.type = "popup";
PopUpModal.storyName = "Поп-ап";
PopUpModal.args = {
  storeData: PopUpData,
};
