import "@/assets/scss/globals.scss";
import "@/assets/scss/overrides.scss";

import docs from "./docs/Pages.mdx";

import LWrapper from "../components/LWrapper";

import { menuMockData } from "./consts";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/1. Layout/Навигационная панель`,
  component: LWrapper,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LWrapper },
  template: `<div><LWrapper v-bind="$props" /></div>`,
});

export const Nav = StaticTemplate.bind({});
Nav.storyName = "Навигационная панель";
Nav.args = {
  menu: menuMockData,
  fetching: false,
};
