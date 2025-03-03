import axios from "axios";
import { getCookieToken } from "../utils/cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token a todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getCookieToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com erros 401 e refresh token
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Verifica se é erro 401 e se não é uma tentativa de refresh
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = getCookieToken();

//         if (!refreshToken) {
//           throw new Error("No refresh token available");
//         }

//         const response = await authService.refreshToken(refreshToken);

//         const { accessToken, refreshToken: newRefreshToken } = response.data;

//         // Atualiza o token nos headers
//         api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//         // Atualiza o token no storage
//         setCookieToken(newRefreshToken);

//         // Refaz a requisição original com o novo token
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Se falhar o refresh, redireciona para login
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
