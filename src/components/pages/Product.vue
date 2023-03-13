<template>
  <div id="product-page" class="home">
    <bread-crumbs
      v-if="getMeta && pageContext === 'static'"
      :list="getMeta.breadcrumbs"
      :executor="actionHandler"
    />
    <div class="heading-wrap">
      <h1>{{ getHeading }}</h1>
      <v-btn
        fab
        small
        elevation="1"
        data-test="return-button"
        class="return-button"
        title="Вернуться"
        @click="$router.go(-1)"
      >
        <span>&#8617;</span>
      </v-btn>
    </div>
    <product-form
      v-if="formData"
      :formData="formData"
      :submit="submit"
      :action-handler="actionHandler"
      :refresh="fetchPage"
      :errors="errors"
    />

    <MessageOverlay
      :show="modal"
      :status="modalMode"
      :message="modalMsg"
      @close="modalClose"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
import ProductForm from "@/components/forms/ProductForm.vue";
import MessageOverlay from "@/components/layout/MessageOverlay.vue";

import { IErrors, IProductPage } from "@/store/modules/product/interfaces";
import { apiRoot, ResStatus } from "@/router/enums";
import {
  ICatalogAction,
  IRequestWrapperRes,
} from "@/store/modules/catalog/interfaces";
import { BasicObject, IPageMeta } from "@/store/interfaces";

import { RMethods } from "@/utils/enums";
import { origin } from "@/utils";
import { dynamicStore } from "@/store";

interface ProductPage {
  data: IProductPage;
  meta: IPageMeta;
}

const defaultErr = "При отправке данных произошел сбой";
const defaultSuccess = "Изменения успешно сохранены";

let timer: number | undefined = undefined;

@Component({
  components: {
    ProductForm,
    BreadCrumbs,
    MessageOverlay,
  },
})
export default class Product extends Vue {
  modal = false;
  modalMsg = defaultSuccess;
  modalMode = ResStatus.SUCCESS;

  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  readonly storeData!: ProductPage;

  @Prop({ type: Function, default: () => null })
  readonly queryHandler!: (name: string, value: string) => void;

  @Prop({ type: Function, default: () => null })
  readonly actionHandler!: (
    action: ICatalogAction,
  ) => Promise<IRequestWrapperRes>;

  @Prop({ type: Object, default: () => ({}) })
  readonly errors!: IErrors;

  get pageContext() {
    return this.storeData.data.type;
  }

  get getProduct() {
    return this.storeData.data;
  }
  get formData() {
    return this.getProduct?.data?.form;
  }
  get getMeta() {
    if (this.storeData.meta?.title) document.title = this.storeData.meta.title;
    return this.storeData.meta;
  }
  get getHeading() {
    return this.storeData.meta?.h1;
  }

  async fetchPage() {
    const action = {
      method: RMethods.GET,
      params: this.$route.query,
      url: origin + apiRoot + this.$route.path,
    };

    await this.actionHandler(action);
  }

  async submit(pl: BasicObject, showSuccessModal: boolean): Promise<boolean> {
    if (!this.formData) return false;

    const action: ICatalogAction = this.formData.action;

    const route = action.route;
    delete action.route;

    action.data = pl;

    const res = await this.actionHandler(action);

    if (showSuccessModal) {
      if (res.status === ResStatus.SUCCESS) {
        if (route) {
          this.actionHandler({
            route,
            method: RMethods.GET,
          });
        }
        this.modalOpen(res.data?.message || defaultSuccess, res.status);
      }
    }

    return true;
  }

  modalOpen(msg: string, mode = ResStatus.SUCCESS) {
    this.modal = true;
    this.modalMsg = msg;
    this.modalMode = mode;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.modalClose();
    }, 2000);
  }

  modalClose() {
    this.modal = false;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.modalMsg = "";
      this.modalMode = ResStatus.SUCCESS;
    }, 250);
  }
}
</script>

<style lang="scss">
#product-page {
  .upload-warning {
    padding: 24px;
    text-align: center;
    min-height: 300px;
  }
  h1 {
    margin-bottom: 20px;
  }
  > * {
    display: block;
  }
  a {
    text-decoration: none;
  }
  .heading-wrap {
    position: relative;
    max-width: 1072px;
  }
}
.return-button {
  position: absolute;
  background-color: #fff !important;
  right: 0;
  bottom: 0;
}
</style>
