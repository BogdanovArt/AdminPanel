import axios from "axios";

import router from "@/router";
import { authStore } from "@/store";

import { Storage, origin } from "@/utils";
import { RMethods } from "@/utils/enums";
import { apiRoot, Routes } from "@/router/enums";

const refreshUrl = origin + apiRoot + "/auth/refresh";

axios.interceptors.request.use(request => {
  const token = localStorage.getItem(Storage.TOKEN);  
  if (token) request.headers.Authorization = "Bearer " + token;
  return request;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originRequest = error.config;
    const refresh = localStorage.getItem(Storage.REFRESH_TOKEN);

    if (error.response.status !== 401 || !refresh) {
      // no refresh token
      return Promise.reject(error);
    } else if (originRequest.url === refreshUrl) {
      // refresh request failed - error catched (before chain catch)
      router.push(Routes.LOGIN);
      authStore.logout();
      return Promise.reject(error);
    }

    // create refresh request
    const refreshRequest = {
      url: refreshUrl,
      method: RMethods.POST,
      data: { refresh },
    };

    // send refresh request
    return axios(refreshRequest)
      .then(response => {
        // refresh request succeeded;
        const newToken = response.data.data.token;
        const newRefresh = response.data.data.refresh;
        if (newToken && newRefresh) {
          localStorage.setItem(Storage.TOKEN, newToken);
          localStorage.setItem(Storage.REFRESH_TOKEN, newRefresh);
          axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        }
        return axios(originRequest);
      })
      .catch(() => {
        // refresh request failed  (catches after if/else catch condition)
        const tokenError = new Error("Cannot refresh token");
        return Promise.reject(tokenError);
      });
  },
);

export default axios;
