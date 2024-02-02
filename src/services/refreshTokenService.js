import { tokenService } from "./tokenService.js"

export const refreshTokenService = {
  refreshToken: async () => {
    const request = new Request(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Auth/refresh-token`, {
      method: "POST",
      credentials: "include"
    })
    return fetch(request)
      .then(res => res.json())
      .then(data => {
        tokenService.setToken(data);
      })
      .catch(err => {
        return Promise.reject()
      })
  }
}