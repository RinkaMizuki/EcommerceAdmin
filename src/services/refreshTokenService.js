export const refreshTokenService = {
  refreshToken: async () => {
    const request = new Request(`${import.meta.env.VITE_ECOMMERCE_SSO_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include"
    })
    return fetch(request)
      .then(res => res.json())
      .then(data => {
        //toast info
        console.log(data);
      })
      .catch(err => {
        return Promise.reject()
      })
  }
}