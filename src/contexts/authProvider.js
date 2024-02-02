import { tokenService } from "../services/tokenService";
import { logoutService } from "../services/logoutService"

export const authProvider = {
  login: async (params) => {
    const request = new Request(`${import.meta.env.VITE_ECOMMERCE_BASE_URL}/Auth/login`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include"
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(auth => {
        tokenService.setUser(auth)
        tokenService.setToken(auth)
      })
      .catch(err => {
        throw new Error(err);
      })
  },
  //mỗi khi user navigate page sẽ gọi lại hàm này để check ràng user thực sự vẫn còn authen
  checkAuth: async () => {
    const token = tokenService.getToken();
    if (token) return Promise.resolve()
    return Promise.reject() // khi bị rejected sẽ gọi hàm logout và nếu checkAuth có chuyển hướng thì nó sẽ được ưu tiên thay vì phải theo logout
  },
  checkError: async (error) => {
  },
  getPermissions: async () => { },
  logout: async () => {
    let userId = tokenService.getUser()?.userId
    if (!userId) userId = 0
    await logoutService.logout(userId)
    return Promise.resolve();
  },
}
