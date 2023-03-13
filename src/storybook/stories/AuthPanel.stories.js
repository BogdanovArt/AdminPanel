import "@/assets/scss/globals.scss";

import AuthPanelComponent from "../../components/layout/AuthPanel";

// import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/1. Layout/Панель мастер-авторизации`,
  component: AuthPanelComponent,
  parameters: {},
};

const StaticTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AuthPanelComponent },
  template: `<AuthPanelComponent v-bind="$props" />`,
});

export const Panel = StaticTemplate.bind({});
Panel.storyName = "Панель мастер-авторизации";
Panel.args = {
  name: "User 28",
};
