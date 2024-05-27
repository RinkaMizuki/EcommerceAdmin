import { jwtDecode } from "jwt-decode";
import { HttpError } from "react-admin";


const refreshToken = async () => {
  const request = new Request(`${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/refresh-token?type=default`, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return fetch(request)
}

export const getAccessToken = () => {
  return localStorage.getItem("token") !== 'undefined' ? JSON.parse(localStorage.getItem("token")) || import.meta.env.VITE_ECOMMERCE_TOKEN_FAKE : import.meta.env.VITE_ECOMMERCE_TOKEN_FAKE
}

// const handleErrorResponse = async (response) => {
//   const text = await response.text();
//   const o = {
//     status: response.status,
//     statusText: response.statusText,
//     headers: response.headers,
//     body: text,
//   };
//   let status = o.status, statusText = o.statusText, headers = o.headers, body = o.body;
//   let json;
//   try {
//     json = JSON.parse(body);
//   } catch (e) {
//     console.log("Response is not JSON:", body);
//   }
//   if (status < 200 || status >= 300) {
//     return Promise.reject(new HttpError((json && json.error && json.error.message) || statusText, status, json));
//   }
//   return json;
// };

let isRefreshing = false;
let refreshPromise = null; // Promise đại diện cho việc refresh token
export const isTokenRefreshing = () => {
  return isRefreshing;
};
export const refreshAuth = async () => {
  //return refreshMutex.runExclusive(async () => {

  // Nếu đang trong quá trình refresh token, trả về Promise hiện đang chạy
  if (isRefreshing) {
    await refreshPromise;
    return;
  }
  // Nếu không, bắt đầu quá trình refresh token
  isRefreshing = true;

  // Tạo một Promise mới cho việc refresh token
  refreshPromise = new Promise(async (resolve, reject) => {
    try {
      // Thực hiện refresh token
      const token = getAccessToken();
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp < Date.now() / 1000) {
        const response = await refreshToken()
        const text = await response.text();
        const o = {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: text,
        };
        let status = o.status, statusText = o.statusText, headers = o.headers, body = o.body;
        let json;
        try {
          json = JSON.parse(body);
        } catch (e) {
          console.log("Response is not JSON:", body);
        }
        if (status < 200 || status >= 300) {
          isRefreshing = true;
          reject(new HttpError((json && json.error && json.error.message) || statusText, status, json));
          return;
        }
        localStorage.setItem("token", JSON.stringify(json.accessToken));
        resolve({ status: status, headers: headers, body: body, json: json });
        return;
      }
      resolve()
    } catch (error) {
      reject(error);
    } finally {
      // Sau khi refresh token hoàn thành, đặt lại các biến trạng thái
      isRefreshing = false;
      refreshPromise = null;
    }
  });

  // Trả về Promise cho việc refresh token
  return refreshPromise;

  // const token = localStorage.getItem("token") !== 'undefined' ? JSON.parse(localStorage.getItem("token")) || import.meta.env.VITE_ECOMMERCE_TOKEN_FAKE : import.meta.env.VITE_ECOMMERCE_TOKEN_FAKE
  // const decodedToken = jwtDecode(token)
  // if ((decodedToken.exp < Date.now() / 1000 && !isRefreshFailure)) {

  //   const response = await refreshToken()
  //   const text = await response.text();
  //   const o = {
  //     status: response.status,
  //     statusText: response.statusText,
  //     headers: response.headers,
  //     body: text,
  //   };
  //   let status = o.status, statusText = o.statusText, headers = o.headers, body = o.body;
  //   let json;
  //   try {
  //     json = JSON.parse(body);
  //   } catch (e) {
  //     console.log("Response is not JSON:", body);
  //   }
  //   if (status < 200 || status >= 300) {
  //     isRefreshFailure = true;
  //     return Promise.reject(new HttpError((json && json.error && json.error.message) || statusText, status, json));
  //   }
  //   // const json = await handleErrorResponse(response);
  //   localStorage.setItem("token", JSON.stringify(json.accessToken))
  //   return Promise.resolve({ status: response.status, headers: response.headers, body: response.body, json: json });
  // }
  // return Promise.resolve();
  //});
};