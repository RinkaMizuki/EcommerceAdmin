import { tokenService } from "./tokenService"

export const logoutService = {
  logout: async (userId) => {
    const request = new Request(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Auth/logout?userId=${userId}`, {
      method: "POST",
      credentials: "include"
    })
    return fetch(request)
      .then(res => res.json())
      .then(data => {
        tokenService.removeToken()
      })
      .catch(err => {
        throw new Error(err.message)
      })
  }
}