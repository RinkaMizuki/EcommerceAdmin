export const tokenService = {
  setUser: (data) => {
    localStorage.setItem(import.meta.env.VITE_ECOMMERCE_USER_KEY, JSON.stringify(data.user))
  },
  getUser: () => {
    const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_ECOMMERCE_USER_KEY) || JSON.stringify({}))
    return user
  },
  setToken: (data) => {
    localStorage.setItem(import.meta.env.VITE_ECOMMERCE_TOKEN_KEY, JSON.stringify(data.accessToken || ""));
  },
  getToken: () => {
    const token = JSON.parse(localStorage.getItem(import.meta.env.VITE_ECOMMERCE_TOKEN_KEY) || JSON.stringify(""))
    return token
  },
  removeToken: () => {
    localStorage.removeItem(import.meta.env.VITE_ECOMMERCE_USER_KEY)
    localStorage.removeItem(import.meta.env.VITE_ECOMMERCE_TOKEN_KEY)
  }
}