import { RMethods } from "@/utils/enums";

import { Route } from "vue-router";
import { QueryPL } from "@/utils/interfaces";
import { BasicObject } from "@/store/interfaces";
import { apiRoot, Endpoints } from "@/router/enums";
import { AxiosResponse } from "axios";

export const Storage = {
  TOKEN: "token",
  NAME: "name",
  REFRESH_TOKEN: "refresh",
  USER: "user",
  SAVED_USER: "saved_user",
  SAVED_TOKEN: "saved_token",
  SAVED_REFRESH_TOKEN: "saved_refresh_token",
};

export const fetchWrapper = async (
  setFetching: (value: boolean) => void,
  func: () => Promise<any> // eslint-disable-line
) => {
  let fetch = false;
  setTimeout(() => {
    if (fetch) setFetching(true);
  }, 300);
  try {
    fetch = true;
    await func();
    fetch = false;
  } catch (err) {
    fetch = false;
  }
  setFetching(false);
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";");
  const token = cookies.filter((item) => item.indexOf(name) >= 0);
  let cookie = null;
  if (token.length) cookie = token[0].replace(`${name}=`, "").trim();
  return cookie;
};

export const getToken = () => {
  return localStorage.getItem(Storage.TOKEN);
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getCatalogAction = (route: Route) => {
  const { category } = route.params;
  const url = Endpoints.CATALOG + (category ? "/category/" + category : "");
  return {
    method: RMethods.GET,
    params: route.query,
    url,
  };
};

export const getProductAction = (route: Route) => {
  const { id } = route.params;
  const url = Endpoints.PRODUCTS + (id ? "/" + id : "");
  return {
    method: RMethods.GET,
    params: route.query,
    url,
  };
};

export const setQuery = ({ name, value, query }: QueryPL) => {
  const q = Object.assign({}, query);
  if (name && value) q[name] = value as string;
  if (!value && q[name]) {
    delete q[name];
  }
  return Object.keys(q).length > 0 ? q : {};
};

export const copy = <T>(entity: T) => {
  // eslint-disable-line
  return JSON.parse(JSON.stringify(entity)) as T;
};

export const arRemove = (array: any[], element: BasicObject, field: string) => {
  // eslint-disable-line
  const index = array.findIndex((el) => el[field] === element[field]);
  if (index > -1) array.splice(index, 1);
};

export const asyncTimeOut = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const origin =
  process.env?.VUE_APP_MOCK_SERVER || document.location.origin;

export function getPath(url: string) {
  return url.replace(origin, "").replace(apiRoot, "");
}

export const downloadHandler = (res: AxiosResponse) => {
  try {
    let fileName = "download.txt";
    let contentType = "text/plain";

    const dispositionHeaders = res.headers["content-disposition"].split(";");
    dispositionHeaders.forEach((headerString: string) => {
      if (headerString.includes("filename")) {
        fileName = headerString.split("=")[1];
      }
    });
    const contentTypeHeaders = res.headers["content-type"].split(";");
    contentTypeHeaders.forEach((headerString: string) => {
      if (headerString.includes("/")) {
        contentType = headerString;
      }
    });

    download(res.data, fileName, contentType);
  } catch (error) {
    console.warn(error);
  };
};

export const download = (
  content: string,
  fileName: string,
  contentType: string,
  blob?: Blob
) => {
  const a = document.createElement("a");
  const file = blob || new Blob([content], { type: contentType });
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = fileName;
  a.click();
};