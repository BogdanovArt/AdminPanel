import { ICatalogAction, ICellControl } from "@/store/modules/catalog/interfaces";
import { IDataEntity, InputValue } from "@/store/interfaces";
import { PageTypes } from "../dynamic/interfaces";

export interface IProductPage {
  name: string;
  title?: string;
  type: string;
  data: {
    type: PageTypes.FORM;
    form: IProductForm;
  };
}

export interface IErrors {
  status: number;
  data: {
    [key: string]: string | string[];
  };
}

export interface IProductForm extends IDataEntity {
  action: ICatalogAction;
  items: Array<IFormInputGroup | IGroupEntity>;
  dragAction?: ICatalogAction;
}

export type InputItem = IFormInput | IFormCheckbox | IFormFileInput | IFormButton;

export interface IFormInputGroup extends IDataEntity {
  title?: string;
  items: InputItem[];
}

export interface IGroupEntity extends IFormInputGroup {
  id: number;
  dragAction?: ICatalogAction;
  controls?: ICellControl[];
}

export interface IFormButton extends IDataEntity{
  title?: string;
  icon?: string;
  action?: ICatalogAction;
}

export interface IValidation {
  value: string;
  errorMessage?: string;
}

export interface IFormInput extends IDataEntity{
  name: string;
  value?: InputValue;
  tooltip?: IToolTip;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  rules?: string;
  mask?: IValidation;
  regex?: IValidation;
  allowedCharacters?: string;
}

export interface IFormCheckbox extends IFormInput{
  checked: boolean;
}

export interface IToolTip {
  title: string;
  icon: string;
  external_url?: string;
}

export interface IFormFileInput extends IFormInput{
  items: IImageItem[];
}

export interface IImageItem extends IDataEntity{
  id: number;
  action: ICatalogAction;
  url: string;
}