import Vue from "vue";
import Vuex, { Store } from "vuex";

import { initializeStores, modules } from "@/store/accessors";

Vue.use(Vuex);

const initializer = (store: Store<any>) => initializeStores(store);  // eslint-disable-line
export const plugins = [initializer];

const store = new Vuex.Store({
  plugins,
  modules,
});

export * from '@/store/accessors';
export default store;
