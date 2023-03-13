import axios from "@/utils/interceptors";

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import {
  ICatalogPage,
  IFetchPayload,
  IRequestWrapperRes,
} from "../catalog/interfaces";
import { ContextTypes, PageTypes } from "./interfaces";
import { IErrors, IProductPage } from "../product/interfaces";

import { BasicObject, IPageMeta, IPopUpData } from "@/store/interfaces";

import { downloadHandler, fetchWrapper } from "@/utils";
import { ResStatus } from "@/router/enums";

type Content = IProductPage | ICatalogPage;
type PageData = { data: Content; meta: IPageMeta } | null;
type PopUpData = IPopUpData | null;

@Module({
  name: "dynamicModule",
  stateFactory: true,
  namespaced: true,
})
class Dynamic extends VuexModule {
  fetching = false;
  errors?: IErrors = undefined;
  staticContent: PageData = null;
  modalContent: PageData = null;
  popUpContent: PopUpData = null;

  lastStaticAction: IFetchPayload | null = null;

  get pageErrors() {
    return this.errors;
  }

  get fetchingState() {
    return this.fetching;
  }

  get lastAction() {
    return this.lastStaticAction;
  }

  get ModalContent() {
    return this.modalContent;
  }

  get StaticContent() {
    return this.staticContent;
  }

  get PopUpContent() {
    return this.popUpContent;
  }

  @Mutation
  setStaticData(data: PageData) {
    this.staticContent = data;
  }

  @Mutation
  setModalData(data: PageData) {
    this.modalContent = data;
  }

  @Mutation
  setPopUpData(data: PopUpData) {
    this.popUpContent = data;
  }

  @Mutation
  saveAction(data: IFetchPayload) {
    this.lastStaticAction = data;
  }

  @Mutation
  setFetching(fetching: boolean) {
    this.fetching = fetching;
  }

  @Mutation
  setErrors(data?: IErrors) {
    this.errors = data;
  }

  @Action({ rawError: true })
  async fetchData(payload: IFetchPayload) {
    const { action } = payload;

    // this.setErrors();

    const request = {
      method: action.method,
      url: action.url,
      data: action.data,
      params: action.params,
    };

    const response: IRequestWrapperRes = {
      status: ResStatus.SUCCESS,
      errors: null,
      data: null,
      code: 200,
    };

    await fetchWrapper(this.setFetching, async () => {
      await axios(request)
        .then(res => {
          const { data } = res;

          if (res.data.errors) {
            errorHandler(res.data.errors, res.status, this.setErrors);
          }

          if (res.headers["content-disposition"]) {
            downloadHandler(res);
          }

          if (data.data?.type) {
            const table = !!data.data?.data?.table;
            const form = !!data.data?.data?.form;

            switch (true) {
              case form:
                data.data.data.type = PageTypes.FORM;
                break;
              case table:
                data.data.data.type = PageTypes.TABLE;
                break;
              default:
                break;
            }

            switch (data.data.type) {
              case ContextTypes.modal:
                this.setPopUpData(null);
                this.setModalData(data);
                break;
              case ContextTypes.popup:
                this.setPopUpData(data.data?.data);
                break;
              default:
                this.setPopUpData(null);
                this.setModalData(null);
                this.saveAction(payload);
                this.setStaticData(data);
                break;
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

          errorHandler(err.response.data, response.code, this.setErrors);
        });
    });

    return response;
  }
}

const errorHandler = (
  data: string | string[] | Object,
  responseCode = 500,
  setter: (error: IErrors) => void,
) => {
  let errorMessage = "";
  switch (typeof data) {
    case "string":
      errorMessage = data as string;
      break;
    default:
      errorMessage = JSON.stringify((data as BasicObject)?.errors || data);
      break;
  }
  setter({ data: { errors: errorMessage }, status: responseCode });
};

export default Dynamic;
