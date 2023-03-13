<template>
  <div id="product-form">
    <pre v-if="false">
      {{ form }}
      {{ entities }}
    </pre>
    <v-expansion-panels multiple v-model="opened">
      <v-expansion-panel
        :key="i"
        v-for="(item, i) in inputGroups"
        data-test="form-block"
        :class="['input-group-panel']"
      >
        <v-expansion-panel-header class="expand-button">
          <h3>{{ item.title }}</h3>
          <div v-if="item.controls" class="control-buttons">
            <template v-for="(el, i) in item.controls">
              <v-btn
                :key="i"
                :title="el.title"
                :data-test="`form-block-button-${el.icon}`"
                class="control-button"
                text
                icon
                @click.stop="safeAction(el.action, el.type)"
              >
                <v-icon>{{ el.icon }}</v-icon>
              </v-btn>
            </template>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <group
            :id="item.id"
            :items="item.items"
            :handler="dataReceiver"
            :errors="errors"
            @action="safeAction"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div v-if="formControls.length" class="form-controls">
      <div v-for="(block, index) in formControls" :key="index">
        <template v-for="(el, i) in block.items">
          <v-btn
            :key="`${index}-${i}`"
            :data-test="`form-controls-${el.type}`"
            :class="['form-button', el.type]"
            style="margin-top: 20px"
            @click="safeAction(el.action, el.type)"
          >
            <v-icon v-if="el.icon" style="margin-right: 10px">
              {{ el.icon }}
            </v-icon>
            {{ el.title }}
          </v-btn>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import draggable from "vuedraggable";

import InputExpandableGroup from "@/components/inputs/InputExpandableGroup.vue";

import {
  IErrors,
  IFormInputGroup,
  IGroupEntity,
  IProductForm,
} from "@/store/modules/product/interfaces";
import { BasicObject, InputValue } from "@/store/interfaces";
import { ICatalogAction } from "@/store/modules/catalog/interfaces";
import { copy } from "@/utils";
import { RMethods } from "@/utils/enums";

@Component({
  components: {
    group: InputExpandableGroup,
    draggable,
  },
})
export default class ProductForm extends Vue {
  opened: number[] = [...Array(20).keys()];
  form: BasicObject = {};
  entities: BasicObject[] = [];
  inputGroups: Array<IFormInputGroup | IGroupEntity> = [];

  get formControls() {
    return this.formData.items.filter(item => item.type === "buttons").flat();
  }

  @Prop({ type: Object, default: () => ({}) })
  readonly formData!: IProductForm;

  @Prop({ type: Function, default: () => null })
  readonly submit!: (
    pl: BasicObject | BasicObject[],
    showSuccessModal?: boolean,
  ) => Promise<void>;

  @Prop({ type: Function, default: () => null })
  readonly refresh!: () => Promise<void>;

  @Prop({ type: Function, default: () => null })
  readonly actionHandler!: (action: ICatalogAction) => void;

  @Prop({ type: Object, default: () => ({}) })
  readonly errors!: IErrors;

  @Watch("formData")
  setItems() {
    this.entities = [];
    this.inputGroups = this.formData.items.filter(
      item => item.type === "group",
    );
  }

  dataReceiver(name: string, val: InputValue, id?: number) {
    if (name) {
      if (id) {
        this.setEntityData(name, val, id);
      } else {
        this.setFlatObject(name, val);
      }
    }
  }

  setFlatObject(name: string, val: InputValue) {
    const FORM = copy(this.form);
    FORM[name] = val;
    this.form = FORM;
  }

  setEntityData(name: string, val: InputValue, id: number) {
    const ENTITIES: BasicObject[] = copy(this.entities);
    const match = ENTITIES.findIndex(entity => entity.id === id);
    if (match > -1) {
      const entity = ENTITIES[match];
      entity[name] = val;
      ENTITIES[match] = entity;
    } else {
      ENTITIES.push({ id, [name]: val });
    }
    this.entities = ENTITIES;
  }

  async safeAction(action?: ICatalogAction, type?: string) {
    const PL = this.entities.length ? this.entities : this.form;

    await this.submit(PL, type === "button-submit");

    if (action && action.method !== RMethods.PATCH) {
      await this.actionHandler(action);
    }
    if (action?.method !== RMethods.GET) await this.refresh();
  }

  mounted() {
    this.setItems();
  }
}
</script>

<style lang="scss">
.control-buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;
}
.form-button {
  text-transform: none;
  margin-right: 16px;
  &.button-submit {
    background-color: $main-color !important;
    color: #fff;
  }
}
.expand-button {
  font-size: 14px;
}
.v-expansion-panel-header {
  padding: 8px 24px;
}
.expand-button.v-expansion-panel-header--active {
  border-bottom: 1px solid $border-color;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
#product-form {
  position: relative;
  max-width: 1072px;
  .v-expansion-panel-content__wrap {
    padding: 0 24px;
  }
  .form-controls {
    position: sticky;
    bottom: 10px;
    z-index: 10;
    pointer-events: none;
    button {
      pointer-events: all;
    }
  }
}
</style>
