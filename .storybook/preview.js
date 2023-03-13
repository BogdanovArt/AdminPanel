import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

import "@mdi/font/css/materialdesignicons.css";

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story, context) => {
    const wrapped = story(context);
    // extend Vue to use Vuetify around the wrapped component
    return Vue.extend({
      router,
      vuetify: new Vuetify({
        icons: {
          iconfont: "mdi",
        },
      }),
      components: { wrapped },
      template: `
        <v-app>
          <wrapped />
        </v-app>
      `,
    });
  },
];
