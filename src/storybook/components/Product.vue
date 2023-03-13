<template>
  <div id="product-page" class="home">
    <bread-crumbs
      v-if="getMeta && pageContext === 'static'"
      :list="getMeta.breadcrumbs"
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
      :executor="executeAction"
      :refresh="fetchPage"
      :errors="getErrors"
    />
    <v-dialog v-model="modal" width="500">
      <v-card>
        <v-card-text class="upload-warning" style="padding: 80px 24px;">
          {{ modalMsg }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            text
            x-small
            style="text-transform: none"
            @click="modalClose"
          >
            Понятно
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import BreadCrumbs from "@/components/common/BreadCrumbs.vue";
import ProductForm from "@/components/forms/ProductForm.vue";

import { dynamicStore } from "@/store";

import { IProductPage } from "@/store/modules/product/interfaces";
import { apiRoot, ResStatus } from "@/router/enums";
import { ICatalogAction } from "@/store/modules/catalog/interfaces";
import { BasicObject, IPageMeta } from "@/store/interfaces";

import { RMethods } from "@/utils/enums";
import { origin } from "@/utils";

interface ProductPage {
  data: IProductPage;
  meta: IPageMeta;
}

const defaultErr = "При отправке данных произошел сбой";
const defaultSuccess = "Изменения успешно сохранены";

@Component({
  components: {
    ProductForm,
    BreadCrumbs,
  },
})
export default class Product extends Vue {
  modal = false;
  modalMsg = "";

  @Prop({ type: Boolean, default: false })
  readonly fetching!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  readonly storeData!: ProductPage;

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
    return this.storeData.meta;
  }
  get getErrors() {
    return dynamicStore?.pageErrors;
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

    await this.executeAction(action);
    if (this.getMeta && this.getMeta.title) {
      document.title = this.getMeta.title;
    }
  }

  async executeAction(action: ICatalogAction) {
    alert(`действие: ${JSON.stringify(action)}`);
    // return dynamicStore.fetchData({ action, route: this.$route.path });
  }

  async submit(pl: BasicObject, suppress: boolean) {
    if (this.formData) {
      const action: ICatalogAction = this.formData.action;
      // let errorMessage = defaultErr;
      // const successMessage = defaultSuccess;
      action.data = pl;

      if (!suppress) {
        this.modalOpen(`Отправка данных формы:
        ${JSON.stringify(action)}
      `);
      }

      // const res = await dynamicStore.fetchData({
      //   action,
      //   route: this.$route.path,
      // });

      // if (res.errors) {
      //   if (typeof res.errors === "string") {
      //     errorMessage = res.errors;
      //   } else if (res.errors.length) {
      //     errorMessage = res.errors.join(" ");
      //   }
      // }
      // if (!suppress) {
      //   this.modalOpen(
      //     res.status === ResStatus.ERROR ? errorMessage : successMessage
      //   );
      // }
    }
  }

  modalOpen(msg: string) {
    this.modal = true;
    this.modalMsg = msg;
  }

  modalClose() {
    this.modal = false;
    this.modalMsg = "";
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
