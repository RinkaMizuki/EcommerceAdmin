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
      .then(res => res.json())
      .then(data => {
        tokenService.setUser(data)
        tokenService.setToken(data)
        return Promise.resolve();
      })
      .catch(err => {
        throw new Error(err.message)
      })
  },
  //mỗi khi user navigate page sẽ gọi lại hàm này để check ràng user thực sự vẫn còn authen
  checkAuth: async () => {
    const user = tokenService.getUser();
    if (user) return Promise.resolve()
    return Promise.reject() // khi bị rejected sẽ gọi hàm logout và nếu checkAuth có chuyển hướng thì nó sẽ được ưu tiên thay vì phải theo logout
  },
  checkError: async (error) => {
    // console.log(error)
  },
  getPermissions: async () => { },
  logout: async () => {
    let userId = tokenService.getUser()?.userId
    if (!userId) userId = 0
    await logoutService.logout(userId)
    return Promise.resolve();
  },
}
