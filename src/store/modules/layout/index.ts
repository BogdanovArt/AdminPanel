import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";

import axios from "@/utils/interceptors";
import { fetchWrapper, origin } from "@/utils";

import { authStore } from "@/store";
import router from "@/router";

import { ILayoutHeader, ILayoutPanel } from "@/store/modules/layout/interfaces";
import { RMethods } from "@/utils/enums";
import { IGenericResponse } from "@/router/interfaces";
import { Endpoints, errorCodes, ResStatus, Routes } from "@/router/enums";

@Module({
  name: "layoutModule",
  stateFactory: true,
  namespaced: true,
})
class Layout extends VuexModule {
  fetching = false;
  header?: ILayoutHeader = undefined;
  navPanel?: ILayoutPanel[] = undefined;

  get panelData() {
    return this.navPanel;
  }

  get headerData() {
    return this.header;
  }

  @Mutation
  setFetching(data: boolean) {
    this.fetching = data;
  }

  @Mutation
  setNavPanel(data: ILayoutPanel[]) {
    this.navPanel = data;
  }

  @Mutation
  setHeader(data: ILayoutHeader) {
    this.header = data;
  }

  @Action
  async fetchData() {
    const request = {
      method: RMethods.GET,
      url: origin + Endpoints.MENU,
    }
    const response: IGenericResponse = {
      status: ResStatus.SUCCESS,
      errors: null,
      data: null,
      code: 200,
    }
    await fetchWrapper(this.setFetching, async () => {
      await axios(request)
        .then(res => {
          const { data } = res;
          if (data.data) {
            if (
              res.status
              && errorCodes.indexOf(res.status) > -1
            ) {
              authStore.logout();
              router.push(Routes.LOGIN);
            }

            if (data.data.navPanel) {
              this.setNavPanel(data.data.navPanel);
            }

            if (data.data.header) {
              this.setHeader(data.data.header)
            }
          }

          document.title = data.meta?.title || "MTK | Управление сайтом";
          response.data = data;
        })
        .catch(err => {
          console.warn(err);
          response.status = ResStatus.ERROR;
          response.errors = err.response.data.errors;
          response.code = err.response.status;
        })
    })
    return response;
  }
}

export default Layout;
