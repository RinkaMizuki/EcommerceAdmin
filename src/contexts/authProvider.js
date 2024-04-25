import { tokenService } from "../services/tokenService";

export const authProvider = {
  login: async (params) => {
    const request = new Request(`${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/login`, {
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
      })
      .catch(err => {
        throw new Error(err.message);
      })
  },
  //mỗi khi user navigate page sẽ gọi lại hàm này để check ràng user thực sự vẫn còn authen
  checkAuth: async () => {
    return Promise.resolve()
    // khi bị rejected sẽ gọi hàm logout và nếu checkAuth có chuyển hướng thì nó sẽ được ưu tiên thay vì phải theo logout
  },
  checkError: async (error) => {
    const status = error.status;
    if (status === 401) {
      //logic refresh token
      return Promise.reject(error);
    }
    console.log(status);
    return Promise.reject(error);
  },
  getPermissions: async () => { },
  logout: async () => {
    const userId = tokenService.getUser()?.id
    const request = new Request(`${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        userId,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return fetch(request)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        tokenService.removeUser();
        return Promise.resolve();
      })
      .catch(err => {
        throw new Error(err.message)
      })
  },
}
