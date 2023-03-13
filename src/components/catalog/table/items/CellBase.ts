import { Component, Prop, Vue } from "vue-property-decorator";

import { IActions } from "./interfaces";
import { ICatalogAction } from "@/store/modules/catalog/interfaces";

@Component
export default class CellBase extends Vue {
  @Prop({ type: Function, default: () => null })
  readonly trigger!: (action: ICatalogAction) => void;

  @Prop({ type: Function, default: () => null })
  readonly set!: (actions: IActions) => void;
}