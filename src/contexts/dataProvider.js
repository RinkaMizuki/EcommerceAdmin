import simpleRestProvider from "ra-data-simple-rest"
import { fetchUtils, addRefreshAuthToDataProvider } from "react-admin";
import { refreshTokenService } from "../services/refreshTokenService";
import { tokenService } from "../services/tokenService";
import { jwtDecode } from "jwt-decode"

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


const createPostFormData = (
  params
) => {
  const formData = new FormData();
  console.log(params.data.avatar)
  const user = tokenService.getUser();
  params.data?.avatar?.rawFile ? formData.append("file", params.data.avatar.rawFile) : formData.append("file", null);
  formData.append("avatar", params.data.avatar != null ? `$avatar_${user.id}_${user.avatar}` : "");
  params.data?.birthDate ? formData.append("birthDate", params.data.birthDate) : formData.append("birthDate", params.data.previousData?.birthDate);
  params.data?.phone ? formData.append("phone", params.data.phone) : formData.append("phone", !params.data.previousData?.phone ? "" : params.data.previousData?.phone);
  params.data?.isActive && formData.append("isActive", params.data.isActive);
  params.data?.userName && formData.append("userName", params.data.userName);
  params.data?.role && formData.append("role", params.data.role);
  params.data?.password && formData.append("password", params.data.password);
  params.data?.email && formData.append("email", params.data.email);
  params.data?.emailConfirm && formData.append("emailConfirm", params.data.emailConfirm);

  return formData;
};

const customDataProvider = {
  ...baseDataProvider,
  update: async (resource, params) => {
    if (resource === "users") {
      const formData = createPostFormData(params);
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
    return baseDataProvider.update(resource, params);
  },
  delete: async (resource, params) => {
    if (resource == "users") {
      return baseDataProvider.delete(`${resource}/delete`, params);
    }
  },
  create: async (resource, params) => {
    if (resource == "users") {
      return baseDataProvider.create(`${resource}/post`, params);
    }
  },
  getList: async (resource, params) => {
    if (resource == "segments") {
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
  }
}

export const dataProvider = addRefreshAuthToDataProvider(customDataProvider, refreshAuth)