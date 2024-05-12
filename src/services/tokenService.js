import { Mutex } from "async-mutex";
import { jwtDecode } from "jwt-decode";

const refreshMutex = new Mutex();

const refreshToken = async () => {
  const request = new Request(`${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/refresh-token?type=default`, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return fetch(request)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.accessToken);
    })
}
export const refreshAuth = async () => {
  return refreshMutex.runExclusive(async () => {
    const token = localStorage.getItem('token') || import.meta.env.VITE_ECOMMERCE_TOKEN_FAKE;
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp < Date.now() / 1000) {
      await refreshToken();
    }
    return Promise.resolve();
  });
};