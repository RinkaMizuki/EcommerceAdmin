import simpleRestProvider from "ra-data-simple-rest"
import { fetchUtils, addRefreshAuthToDataProvider } from "react-admin";
import { refreshTokenService } from "../services/refreshTokenService.js";
import { tokenService } from "../services/tokenService.js";
import { jwtDecode } from "jwt-decode"
import { updateUserFormData, createProductFormData, handleGetFiles } from "../data/index.js";

const httpClient = (url, options = {}) => {
  const token = tokenService.getToken();
  const user = { token: `Bearer ${token}`, authenticated: !!token };
  return fetchUtils.fetchJson(url, { ...options, user, credentials: "include" });
}

export const refreshAuth = async () => {
  const accessToken = tokenService.getToken()
  if (!accessToken) {
    return Promise.reject()
  }
  const accessTokenDecode = jwtDecode(accessToken);
  const dateNow = new Date().getTime()
  if (accessTokenDecode.exp < dateNow / 1000) { //token expired
    await refreshTokenService.refreshToken();
  }
  return Promise.resolve();
}
const baseDataProvider = simpleRestProvider(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin`, httpClient)

const customDataProvider = {
  ...baseDataProvider,
  update: async (resource, params) => {
    if (resource === "users" || resource === "products") {

      const files = await handleGetFiles(params);
      console.log("params:::", params);
      console.log(files);
      console.log("duoc goi la cook");

      return;
      const formData = updateUserFormData(params);
      return fetchUtils
        .fetchJson(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}/update/${params.id}`, {
          method: "PUT",
          body: formData,
          credentials: "include",
          headers: new Headers({
            Authorization: `Bearer ${tokenService.getToken()}`
          })
        })
        .then(({ json }) => {
          const getIdLoginUser = tokenService.getUser().id;
          if (getIdLoginUser == json.id) {
            tokenService.setUser({
              user: json,
            });
          }
          return { data: json }
        });
    }
    return baseDataProvider.update(`${resource}/update`, params);
  },
  delete: async (resource, params) => {
    return baseDataProvider.delete(`${resource}/delete`, params);
  },
  create: async (resource, params) => {
    if (resource === "products") {
      const formData = createProductFormData(params);
      return fetchUtils
        .fetchJson(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}/post`, {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: new Headers({
            Authorization: `Bearer ${tokenService.getToken()}`
          })
        })
        .then(({ json }) => {
          return { data: json }
        });
    }
    return baseDataProvider.create(`${resource}/post`, params);
  },
  getList: async (resource, params) => {
    if (resource == "segments" || resource == "categories") {
      return fetchUtils
        .fetchJson(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}`, {
          method: "GET",
          credentials: "include",
          headers: new Headers({
            Authorization: `Bearer ${tokenService.getToken()}`
          })
        })
        .then(({ json }) => {
          return { data: json, total: json.length }
        });
    }
    return baseDataProvider.getList(resource, params);
  },
  getManyReference: async (resource, params) => {
    return baseDataProvider.getManyReference(resource, params);
  }
}

export const dataProvider = addRefreshAuthToDataProvider(customDataProvider, refreshAuth)