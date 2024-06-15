import { userService } from "../services/userService";

export const authProvider = {
    login: (params) => {
        const request = new Request(
            `${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/login-admin`,
            {
                method: "POST",
                body: JSON.stringify(params),
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "include",
            }
        );

        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((auth) => {
                localStorage.setItem("token", JSON.stringify(auth.accessToken));
                userService.setUser(auth);
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    },
    //mỗi khi user navigate page sẽ gọi lại hàm này để check ràng user thực sự vẫn còn authen
    checkAuth: () => {
        return Promise.resolve();
        // khi bị rejected sẽ gọi hàm logout và nếu checkAuth có chuyển hướng thì nó sẽ được ưu tiên thay vì phải theo logout
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 403) {
            //logic refresh token
            return Promise.reject(error);
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        return Promise.resolve();
    },
    logout: () => {
        const userId = userService.getUser()?.id;
        const request = new Request(
            `${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/logout`,
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    userId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return fetch(request)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.removeItem("token");
                userService.removeUser();
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    },
};
