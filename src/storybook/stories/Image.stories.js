import "@/assets/scss/globals.scss";

import "@/plugins/v-mask";

import ImageUpload from "../components/Image.vue";
import docs from "./docs/Inputs.mdx";
import { getAdminVersion } from "./utils";

export default {
  title: `Админ ${getAdminVersion()}/4. Комплексные поля ввода/Изображения`,
  component: Image,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const DropDownExample = (args, { argTypes }) => ({
  props: Object.keys(args),
  components: { ImageUpload },
  template: `<ImageUpload v-bind="$props" />`,
});

export const DD = DropDownExample.bind({});
DD.storyName = "Изображения";
DD.args = {
  type: "image-upload",
  name: "image",
  label: "Изображение для баннера",
  endpoint: "http://mtk-btb.test.local/api/admin/v1/files/image",
  maxCount: 3,
  maxSize: 8,
  minSize: 0.480,
  maxWidth: 4600,
  maxHeight: 3800,
  minWidth: 300,
  minHeight: 300,
  formats: ["image/png", "image/gif", "image/jpeg", "image/webp"],
  items: [
    {
      type: "image",
      id: 2,
      url: "https://picsum.photos/200",
      action: {
        method: "DELETE",
        url:
          "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/files/image/2",
      },
    },
    {
      type: "image",
      id: 3,
      url: "https://picsum.photos/202",
      action: {
        method: "DELETE",
        url:
          "http://bazaproduktov.a_bogdanov.netex-lab.ru/api/admin/v1/files/image/3",
      },
    },
  ],
};
