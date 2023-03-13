import { ImageTypes, SortOrders } from "@/store/enums";
import { ICatalogAction } from "./modules/catalog/interfaces";

export interface IPageMeta {
  h1?: string;
  title: string;
  breadcrumbs: ICrumb[];
  pagination?: IPaginationData;
  sort?: ISortData;
  total?: number;
}

export interface BasicObject {
  [key: string]: any; // eslint-disable-line
}

export interface IDataEntity {
  type: string;
}

export interface ISortData {
  key: string;
  order: SortOrders;
}

export interface ICrumb {
  url?: string;
  name: string;
  icon?: string;
}

export interface IGenericImage {
  type?: ImageTypes;
  src: string;
  src_mobile?: string;
  name?: string;
}

export interface IPaginationData {
  current_page: number;
  total_pages: number;
  per_page?: number;
}

export interface IPopUpData {
  title: string;
  content: string;
  buttons?: Array<{
    title: string;
    action: ICatalogAction;
    color?: string;
    dark?: boolean;
    icon?: string;
  }>;
}

export type InputValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: InputValue };

export type IComponent = Vue | Vue[];
