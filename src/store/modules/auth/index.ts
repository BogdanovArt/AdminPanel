import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import axios from "@/utils/interceptors";

import { fetchWrapper, Storage, origin, copy } from "@/utils";
import { RMethods } from "@/utils/enums";
import { mainStore } from "@/store";

import { IUserCredentials, IUserData } from "./interfaces";
import { IGenericResponse } from "@/router/interfaces";
import { apiRoot, Endpoints, ResStatus } from "@/router/enums";
import { BasicObject } from "@/store/interfaces";
import { ICatalogAction } from "../catalog/interfaces";

@Module({
  name: "authModule",
  stateFactory: true,
  namespaced: true,
})
class Main extends VuexModule {
  userData: IUserData | null = null;
  savedUserData: IUserData | null = null;
  authenticated = false;
  fetching = false;

  get getUser() {
    return this.userData;
  }

  get getSavedUser() {
    return this.savedUserData;
  }

  @Mutation
  setActiveUser(data: IUserData | null) {
    this.userData = data;
    data
      ? localStorage.setItem(Storage.USER, JSON.stringify(data))
      : localStorage.removeItem(Storage.USER);
  }

  @Mutation
  setSavedUser(data: IUserData | null) {
    this.savedUserData = data;
    data
      ? localStorage.setItem(Storage.SAVED_USER, JSON.stringify(data))
      : localStorage.removeItem(Storage.SAVED_USER);
  }

  @Mutation
  logout() {
    this.userData = null;
    this.savedUserData = null;
    localStorage.removeItem(Storage.USER);
    localStorage.removeItem(Storage.SAVED_USER);
    localStorage.removeItem(Storage.TOKEN);
    localStorage.removeItem(Storage.REFRESH_TOKEN);
    localStorage.removeItem(Storage.SAVED_TOKEN);
    localStorage.removeItem(Storage.SAVED_REFRESH_TOKEN);
  }

  @Mutation
  logoutUser() {
    this.userData = copy(this.savedUserData);
    localStorage.setItem(Storage.USER, JSON.stringify(this.userData));

    this.savedUserData = null;
    localStorage.removeItem(Storage.SAVED_USER);

    const token = localStorage.getItem(Storage.SAVED_TOKEN);
    const refresh = localStorage.getItem(Storage.SAVED_REFRESH_TOKEN);

    token && localStorage.setItem(Storage.TOKEN, token);
    refresh && localStorage.setItem(Storage.REFRESH_TOKEN, refresh);

    localStorage.removeItem(Storage.SAVED_TOKEN);
    localStorage.removeItem(Storage.SAVED_REFRESH_TOKEN);
  }

  @Mutation
  setFetching(fetching: boolean) {
    this.fetching = fetching;
  }

  @Action({ rawError: true })
  async masterAuth(action: ICatalogAction) {

    const response: IGenericResponse = {
      status: ResStatus.SUCCESS,
      errors: null,
      data: null,
    };

    await fetchWrapper(mainStore.setFetching, async () => {
      await axios(action)
        .then(res => {
          const { data } = res;
          const { token, refresh } = data.auth;

          if (data.info && token) {
            const oldUser = copy(this.getUser);
            const newUser = data.info;

            const oldToken = localStorage.getItem(Storage.TOKEN) || "";
            const oldRefresh =
              localStorage.getItem(Storage.REFRESH_TOKEN) || "";

            localStorage.setItem(Storage.SAVED_TOKEN, oldToken);
            localStorage.setItem(Storage.SAVED_REFRESH_TOKEN, oldRefresh);

            localStorage.setItem(Storage.TOKEN, token);
            localStorage.setItem(Storage.REFRESH_TOKEN, refresh);

            this.setSavedUser(oldUser);
            this.setActiveUser(newUser);
            
            if (data.url) window.open(data.url, "_blank")?.focus();
          }
          response.data = data;
        })
        .catch(err => {
          response.status = ResStatus.ERROR;
          response.errors = err.response.data.errors;
        });
    });
    return response;
  }

  @Action({ rawError: true })
  async authenticate(credentials: IUserCredentials) {
    const response: IGenericResponse = {
      status: ResStatus.SUCCESS,
      errors: null,
      data: null,
    };
    const request = {
      method: RMethods.POST,
      url: origin + Endpoints.LOGIN,
      data: credentials,
    };
    await fetchWrapper(mainStore.setFetching, async () => {
      await axios(request)
        .then(res => {
          const { data } = res;
          const user = data.info;
          const name = user?.name || "noname";
          const { token, refresh } = data.auth;
          if (user && token) {
            localStorage.setItem(Storage.TOKEN, token);
            localStorage.setItem(Storage.REFRESH_TOKEN, refresh);
            this.setActiveUser({ name });
          }
          response.data = data;
        })
        .catch(err => {
          response.status = ResStatus.ERROR;
          response.errors = err.response.data.errors;
        });
    });
    return response;
  }
}

export default Main;
