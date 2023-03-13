export enum Routes {
  LOGIN = "/login",
  HOME = "/",
  CATALOG = "/catalog",
  CATEGORY = "/catalog/category/:category",
  PRODUCTS = "/products/:id",
  CONTENT = "/content",
  CONTENT_DYN = "/content/:id",
  BLOCK = "/block/:block",
}

export enum RouteNames {
  LOGIN = "login",
  HOME = "home",
  CATALOG = "catalog",
  CATEGORY = "category",
  PRODUCTS = "product",
  CONTENT = "content-page",
  CONTENT_DYN = "content-dynamic-page",
  BLOCK = "block-page",
}

export enum Endpoints {
  LOGIN = "/api/admin/v1/auth/login",
  MENU = "/api/admin/v1/menu",
  CATALOG = "/api/admin/v1/catalog",
  PRODUCTS = "/api/admin/v1/products",
}

export enum ResStatus {
  ERROR = "error",
  SUCCESS = "success",
}

export enum QueryParams {
  PAGE = "page",
  PER_PAGE = "per_page",
  QUERY = "q",
}

export const apiRoot = "/api/admin/v1";

export const errorCodes = [401, 403];