<template>
  <div class="dropdown-wrapper" ref="wrapper">
    <drop-down-input
      ref="input"
      v-bind="$props"
      :return-value="inputHandler"
      @blur="blurHandler"
      @focus="focusHandler"
    >
      <div class="drop-controls">
        <v-btn
          v-show="value"
          icon
          x-small
          title="Очистить"
          @click="clearClickHandler"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-btn
          v-show="enableAddition && showAdd"
          icon
          x-small
          title="Добавить"
          @click="addHandler"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-btn icon x-small @click="expandClickHandler">
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </div>
    </drop-down-input>
    <template v-if="selectMultiple">
      <drop-down-list-selected :items="selected" :title-key="titleKey" :return-value="itemRemove" />
    </template>
    <transition name="fade">
      <template v-if="expanded">
        <drop-down-list
          ref="list"
          :title-key="titleKey"
          :items="items"
          :selected="selected"
          :select-multiple="selectMultiple"
          :return-value="itemSelectHandler"
          :on-scroll-end="scrollEndHandler"
          :loading="loading"
        />
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import axios from "@/utils/interceptors";
import { copy, arRemove } from "@/utils";

import DropDownInput from "./DropDownInput.vue";
import DropDownList from "./DropDownList.vue";
import DropDownListSelected from "./DropDownListSelected.vue";

import { BasicObject, InputValue } from "@/store/interfaces";
import { ILengthValidation, IMaskValidation } from "@netex/inputs";
import { AxiosRequestConfig, AxiosResponse } from "axios";

/*

  @TODO property icons
  @TODO create ProductList component inheriting this

 */

interface BaseElement {
  id: number;
  title: string;
  selected?: boolean;
}

type Element<T> = T & BaseElement;

type List<R> = Array<Element<R>>;

@Component({
  name: "drop-down",
  components: { DropDownInput, DropDownList, DropDownListSelected },
})
export default class DropDown<L = {}> extends Vue {
  @Prop({ type: String, default: "" })
  readonly name!: string;

  @Prop({ type: String, default: "text" })
  readonly type?: string;

  @Prop({ type: String, default: "Выберите значение" })
  readonly placeholder?: string;

  @Prop({ type: String, default: "title" })
  readonly titleKey!: keyof Element<L>;

  @Prop({ type: Boolean, default: false })
  readonly required?: boolean;

  @Prop({ type: Boolean, default: false })
  readonly disabled?: boolean;

  @Prop({ type: Function, default: null })
  readonly returnValue!: (name: string, value: InputValue[] | List<L>) => null;

  @Prop({ type: Object, default: () => null })
  readonly mask?: IMaskValidation;

  @Prop({ type: Object, default: () => null })
  readonly regex?: IMaskValidation;

  @Prop({ type: Object, default: () => null })
  readonly min?: ILengthValidation;

  @Prop({ type: Object, default: () => null })
  readonly max?: ILengthValidation;

  @Prop({ type: Object, default: () => null })
  readonly maskOptions?: BasicObject;

  @Prop({ type: String, default: null })
  readonly verify?: string;

  @Prop({ type: Array, default: () => [] })
  readonly listSelected!: List<L>;

  @Prop({ type: Array, default: () => [] })
  readonly listItems!: List<L>;

  @Prop({ type: Boolean, default: false })
  readonly selectMultiple?: boolean;

  @Prop({ type: Boolean, default: false })
  readonly enableAddition?: boolean;

  @Prop({ type: String, default: "" })
  readonly endpoint?: string;

  @Prop({ type: Object, default: () => null })
  readonly tooltip?: BasicObject;

  $refs!: {
    input: any; // @TODO inputcomponent types
    wrapper: HTMLElement;
    list: any; // @TODO listcomponent types
  };

  value = "";
  selected: List<L> = [];
  items: List<L> = [];
  expanded = false;
  focus = false;
  loading = false;
  pagination = {
    total_pages: 4,
    current_page: 1,
  };

  get showAdd() {
    if (this.selectMultiple) {
      return !!this.value;
    } else {
      const item = this.items.find(el => el[this.titleKey] === this.value);
      const selected = this.selected.find(
        el => el[this.titleKey] === this.value,
      );
      return !!this.value && !item && !selected;
    }
  }

  @Watch("focus")
  focusWatcher() {
    if (!focus) this.validationHandler();
  }

  @Watch("listSelected")
  selectedListWatcher() {
    this.setItems();
    this.refreshInputValue();
  }

  @Watch("selected")
  selectedWatcher() {
    this.refreshInputValue();
  }

  blurHandler() {
    if (!this.expanded) this.focus = false;
  }

  validationHandler() {
    this.refreshInputValue();
    if (this.required && !this.selected.length) {
      this.value = "";
      this.setInputValue("");
      this.setError("Поле обязательно для заполнения");
    }
  }

  focusHandler() {
    this.$refs.input.setError("");
    this.openDropList();
    this.focus = true;
  }

  clearClickHandler() {
    this.inputHandler(this.name, "");
    this.setInputValue("");
    if (!this.selectMultiple) this.selected = [];
    this.items = this.markSelected(this.items, this.selected);
    this.saveDataHandler();
    if (!this.expanded) this.validationHandler();
  }

  expandClickHandler() {
    this.expanded ? this.closeDropList() : this.openDropList();
  }

  async addHandler() {
    if (this.value) {
      const confirm = window.confirm(
        `Добавить новое свойство "${this.value}" в базу данных?`,
      );
      if (confirm) {
        await this.addRequest(this.value);
        this.saveDataHandler();
      } else {
        this.resetHandler();
      }
    }
  }

  inputHandler(name: string, value: string) {
    if (value !== this.value) {
      this.value = value;
      this.searchRequest(this.value);
    }
  }

  scrollEndHandler() {
    const current = this.pagination.current_page;
    const total = this.pagination.total_pages;
    if (current < total) {
      this.pageRequest(current + 1);
    }
  }

  refreshInputValue() {
    if (!this.selectMultiple && this.selected.length) {
      this.value = this.selected[0][this.titleKey] as string;
      this.setInputValue(this.selected[0][this.titleKey] as string);
    } else {
      this.setInputValue("");
    }
  }

  openDropList() {
    this.expanded = true;
    document.addEventListener("click", this.outsideClickTracker);
  }

  closeDropList() {
    this.expanded = false;
    this.blurHandler();
    document.removeEventListener("click", this.outsideClickTracker);
  }

  setItems() {
    this.selected = copy(this.listSelected);
    this.items = this.markSelected(copy(this.listItems), this.selected);
  }

  setInputValue(value = "") {
    this.$refs.input.val = value;
    this.$refs.input.input.value = value;
    this.$refs.input.checkForValid();
    this.$refs.input.input.scrollLeft = 0;
  }

  setError(str: string) {
    this.$refs.input.setError(str);
  }

  markSelected(array: List<L>, selected: List<L>) {
    return array.map(item => {
      const match = selected.findIndex(sel => sel.id === item.id);
      item.selected = match > -1;
      return item;
    });
  }

  itemSelectHandler(item: Element<L>) {
    this.selectMultiple
      ? this.itemSelectMultiple(item)
      : this.itemSelectSingle(item);
    this.saveDataHandler();
  }

  itemSelectSingle(item: Element<L>) {
    const value = item[this.titleKey] as string;
    this.items.forEach(el => {
      el.selected = false;
    });
    item.selected = true;
    this.selected = [item];
    this.setInputValue(value);
    this.value = value;
    this.closeDropList();
  }

  itemRemove(item: Element<L>) {
    arRemove(this.selected, item, "id");
    const itemIndex = this.items.findIndex(el => el.id === item.id);
    if (itemIndex > -1) this.items[itemIndex].selected = false;
    this.validationHandler();
    this.saveDataHandler();
  }

  itemSelectMultiple(item: Element<L>) {
    if (item.selected) {
      arRemove(this.selected, item, "id");
    } else {
      this.selected.push(item);
    }
    item.selected = !item.selected;
  }

  resetHandler() {
    this.$refs.input.reset();
  }

  saveDataHandler() {
    this.returnValue(
      this.name,
      this.selected.map(item => item.id),
    );
  }

  outsideClickTracker(e: MouseEvent) {
    const isOutside =
      this.$refs.wrapper && !this.$refs.wrapper.contains(e.target as Node);
    if (isOutside) {
      this.closeDropList();
    }
  }

  async searchRequest(search: string) {
    const res = await this.requestWrapper({
      method: "GET",
      url: this.endpoint,
      params: {
        search,
      },
    });
    if (res?.data) {
      const items = res.data?.data?.items;
      const { meta } = res.data;
      if (meta) this.pagination = meta.pagination;
      if (items) this.items = this.markSelected(items, this.selected);
      if (this.$refs.list) this.$refs.list.toTop();
    }
  }

  async pageRequest(page: number) {
    const res = await this.requestWrapper({
      method: "GET",
      url: this.endpoint,
      params: {
        search: this.value,
        page,
      },
    });
    if (res?.data) {
      const items = res.data?.data?.items;
      const { meta } = res.data;
      if (meta) this.pagination = meta.pagination;
      if (items) this.items.push(...this.markSelected(items, this.selected));
    }
  }

  async addRequest(value: string) {
    const res = await this.requestWrapper({
      method: "POST",
      url: this.endpoint,
      data: {
        value,
        property_name: this.name,
      },
    });
    if (res && res.data) {
      const item = res.data;
      if (item) {
        if (this.selectMultiple) {
          this.selected.push(item);
          this.setInputValue("");
          this.inputHandler(this.name, "");
        } else {
          this.selected = [item];
          this.searchRequest("");
        }
        this.closeDropList();
        this.saveDataHandler();
      }
    }
  }

  async requestWrapper(
    request: AxiosRequestConfig,
  ): Promise<AxiosResponse<any> | undefined> {
    try {
      this.loading = true;
      const res = await axios(request);
      this.loading = false;
      return res;
    } catch (err) {
      this.loading = false;
      console.warn(err);
    }
  }

  mounted() {
    this.setItems();
    if (!this.selectMultiple && this.selected.length) {
      const value = this.selected[0][this.titleKey] as string;
      this.value = value;
      this.setInputValue(value);
    }
    if (this.selected.length) {
      this.saveDataHandler();
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  width: 100%;
  position: relative;
  /*padding: 40px;*/
}

.drop-controls {
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 4px;
}
</style>
