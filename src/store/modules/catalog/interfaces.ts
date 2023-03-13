import { RMethods } from "@/utils/enums";
import { BasicObject, IDataEntity } from "@/store/interfaces";
import { PageTypes } from "../dynamic/interfaces";
import { ResStatus } from "@/router/enums";

export interface ICatalogPage {
  data?: {
    type: PageTypes.TABLE;
    table:  ICatalogTable;
  };
  name: string;
  title: string;
  type: string;
}

export enum CatalogParams {
  SORT = "sort",
  ORDER = "order",
}

export type ICatalogControls = {
  [key in CatalogParams]: string;
}

export interface IFetchPayload {
  action: ICatalogAction;
  route?: string;
}

export interface ICatalogAction {
  method: RMethods;
  url?: string;
  data?: BasicObject;
  params?: BasicObject;
  route?: string;
}

export interface ICatalogTable {
  headers: ITableHeader[];
  items: ITableRow[];
  controls?: ICellControl[];
}

export interface ITableHeader {
  align: string;
  sort: string;
  text: string;
}

export interface ITableRow extends IDataEntity {
  data: Array<ITableCell | ITableCellCtrls>;
}

export interface ITableCell extends IDataEntity {
  action?: ICatalogAction;
  icon: string;
  title: string;
}

export interface ITableCellCtrls extends IDataEntity{
  items: ICellControl[];
}

export interface ICellControl extends IDataEntity {
  action?: ICatalogAction;
  icon: string;
  title: string;
}

export interface IRequestWrapperRes {
  errors: null | string[] | string;
  status: ResStatus;
  code: number;
  data: BasicObject | null;
}