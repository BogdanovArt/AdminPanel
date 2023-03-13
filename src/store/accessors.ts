import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

import mainModule from "@/store/modules/main";
import authModule from "@/store/modules/auth";
import layoutModule from "@/store/modules/layout";
import dynamicModule from "@/store/modules/dynamic";

let mainStore: mainModule;
let authStore: authModule;
let layoutStore: layoutModule;
let dynamicStore: dynamicModule;

export function initializeStores (store: Store<any>): void { // eslint-disable-line
  mainStore = getModule(mainModule, store);
  authStore = getModule(authModule, store);
  layoutStore = getModule(layoutModule, store);
  dynamicStore = getModule(dynamicModule, store);
}

export {
  mainStore,
  authStore,
  layoutStore,
  dynamicStore,
}

export const modules = {
  mainModule,
  authModule,
  layoutModule,
  dynamicModule,
}
