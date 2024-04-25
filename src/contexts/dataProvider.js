import simpleRestProvider from "ra-data-simple-rest"
import { fetchUtils, addRefreshAuthToDataProvider } from "react-admin";
import { tokenService } from "../services/tokenService.js";
import { updateUserFormData, productFormData, handleGetFiles, sliderFormData } from "../data/index.js";
import queryString from "query-string";

const httpClient = async (url, options = {}) => {
  return fetchUtils.fetchJson(url, { ...options, credentials: "include" })
}
const refreshAuth = async () => {
  const request = new Request(`${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/refresh-token?type=default`, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return fetch(request)
    .then(res => res.json())
    .then(data => {
      if (data.statusCode === 403) {
        throw new Error("Access denied.")
      }
      return Promise.resolve(data);
    })
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

      return fetchUtils
        .fetchJson(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}/update/${params.id}`, {
          method: "PUT",
          body: formData,
          credentials: "include",
        })
        .then(({ json }) => {
          if (resource === "users") {
            const getIdLoginUser = tokenService.getUser().id;
            if (getIdLoginUser == json.id) {
              tokenService.setUser({
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
      return fetchUtils
        .fetchJson(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}/post`, {
          method: "POST",
          body: formData,
          credentials: "include",
        })
        .then(({ json }) => {
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

      return fetchUtils
        .fetchJson(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Admin/${resource}${filterValue}`, {
          method: "GET",
          credentials: "include",
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
