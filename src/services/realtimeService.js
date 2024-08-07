import * as signalR from "@microsoft/signalr";

import { jwtDecode } from "jwt-decode";
import { getAccessToken, refreshAuth } from "./tokenService";

const accessTokenFactory = async () => {
  let token = getAccessToken();
  // Kiểm tra xem token đã hết hạn chưa
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp < Date.now() / 1000) {
    // Nếu token đã hết hạn, làm mới token
    await refreshAuth();
    token = getAccessToken();
  }
  // Trả về token mới hoặc cũ tùy thuộc vào tình trạng làm mới token
  return token;
};

const hubOptions = {
  accessTokenFactory: async () => await accessTokenFactory(),
  withCredentials: true,
  skipNegotiation: true,
  transport: signalR.HttpTransportType.WebSockets,
};

const orderhubConnection = new signalR.HubConnectionBuilder()
  .withUrl(
    `${import.meta.env.VITE_ECOMMERCE_BASE_URL}/admin/orderhub`,
    hubOptions
  )
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Error)
  .build();

const chathubConnection = new signalR.HubConnectionBuilder()
  .withUrl(
    `${import.meta.env.VITE_ECOMMERCE_BASE_URL}/admin/chathub`,
    hubOptions
  )
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Error)
  .build();
export { orderhubConnection, chathubConnection };
