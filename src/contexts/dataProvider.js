import simpleRestProvider from "ra-data-simple-rest"
import { fetchUtils, addRefreshAuthToDataProvider } from "react-admin";
import { userService } from "../services/userService.js";
import { updateUserFormData, productFormData, handleGetFiles, sliderFormData } from "../data/index.js";
import queryString from "query-string";
import { refreshAuth } from "../services/tokenService.js";

const httpClient = async (url, options = {}) => {
  const token = localStorage.getItem('token') || import.meta.env.VITE_ECOMMERCE_TOKEN_FAKE;
  options = {
    ...options,
    headers: new Headers({ Accept: 'application/json' }),
    credentials: "include",
  };
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}

const baseDataProvider = simpleRestProvider(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin`, httpClient)

const customDataProvider = {
  ...baseDataProvider,
  update: async (resource, params) => {
    const isUsers = resource === "users";
    const isSliders = resource === "sliders";
    const isProducts = resource === "products";
    if (isUsers || isProducts || isSliders) {
      const files = isProducts && await handleGetFiles(params);
      const formData = isUsers ? updateUserFormData(params) : isProducts ? productFormData(params, files) : sliderFormData(params);

      return httpClient(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}/update/${params.id}`, {
        method: "PUT",
        body: formData,
      }).then(({ json }) => {
        if (resource === "users") {
          const getIdLoginUser = userService.getUser().id;
          if (getIdLoginUser == json.id) {
            userService.setUser({
              user: json,
            });
          }
        }
        return { data: json }
      });
    }
    return baseDataProvider.update(`${resource}/update`, params);
  },
  delete: async (resource, params) => {
    return baseDataProvider.delete(`${resource}/delete`, params);
  },
  deleteMany: async (resource, params) => {
    return baseDataProvider.deleteMany(`${resource}/delete`, params);
  },
  create: async (resource, params) => {
    if (resource === "products" || resource === "sliders") {
      const formData = resource === "products" ? productFormData(params) : sliderFormData(params);
      return httpClient(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}/post`, {
        method: "POST",
        body: formData,
      }).then(({ json }) => {
        return { data: json }
      });
    }
    return baseDataProvider.create(`${resource}/post`, params);
  },
  getList: async (resource, params) => {
    if (resource == "segments" || resource == "categories" || resource == "sliders") {
      const hasFilter = Object.keys(params.filter).length !== 0;
      const queryStringData = queryString.stringify({ filter: JSON.stringify(params.filter) })

      const filterValue = hasFilter ? `?${queryStringData}` : "";
      return httpClient(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}${filterValue}`, {
        method: "GET",
      }).then(({ json }) => {
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
