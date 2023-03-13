import { Route } from "vue-router";

import { Routes } from "@/router/enums";
import { getToken } from "@/utils";

import { NextPL } from "@/utils/interfaces";

export const guards = (to: Route, from: Route, next: (rt?: NextPL | string) => void) => {
  const auth = getToken();
  if (to.path === Routes.LOGIN) {
    if (auth) {
      next({ path: Routes.HOME, meta: { jwt: auth }});
    } else if (from.path !== Routes.LOGIN) {
      next();
    }
  } else {
    if (auth) {
      to.meta.jwt = auth;
      next();
    } else {
      next(Routes.LOGIN);
    }
  }
}
