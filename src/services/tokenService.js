export const tokenService = {
  setUser: (data) => {
    localStorage.setItem(import.meta.env.VITE_ECOMMERCE_USER_KEY, JSON.stringify(data.user))
  },
  getUser: () => {
    const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_ECOMMERCE_USER_KEY) || JSON.stringify({}))
    return user
  },
  removeUser: () => {
    localStorage.removeItem(import.meta.env.VITE_ECOMMERCE_USER_KEY)
  }
}