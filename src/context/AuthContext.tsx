import { authService } from "@/services";
import api from "@/services/api";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthState, User } from "../types/auth";
import {
  getCookieToken,
  removeCookieToken,
  setCookieToken,
} from "../utils/cookies";

type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | {
      type: "LOGIN_SUCCESS";
      payload: { user: User; token: string; refreshToken: string };
    }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | {
      type: "AUTH_LOADED";
      payload: { user: User; token: string; refreshToken: string };
    }
  | { type: "AUTH_ERROR" }
  | {
      type: "REFRESH_TOKEN_SUCCESS";
      payload: { token: string; refreshToken: string };
    };

// Estado inicial da autenticação
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Reducer para gerenciar as mudanças de estado da autenticação
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        refreshToken: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        error: null,
      };
    case "AUTH_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        refreshToken: null,
        error: null,
      };
    case "REFRESH_TOKEN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    default:
      return state;
  }
};

// Interface das funções de autenticação fornecidas pelo contexto
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthToken: () => Promise<void>;
}

// Criando o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar token no carregamento inicial
  useEffect(() => {
    const loadUser = async () => {
      const token = getCookieToken();

      if (!token) {
        dispatch({ type: "AUTH_ERROR" });
        return;
      }

      try {
        // Obter dados do usuário
        const response = await authService.me();

        const { user, token, refreshToken } = response;

        dispatch({
          type: "AUTH_LOADED",
          payload: {
            user,
            token,
            refreshToken,
          },
        });
      } catch (error) {
        removeCookieToken();
        dispatch({ type: "AUTH_ERROR" });
      }
    };

    loadUser();
  }, []);

  // Funções de autenticação
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      // Chamada de API para login
      const response = await authService.login(email, password);

      const { user, accessToken, refreshToken } = response;

      console.log(response, "enter here");

      // Salvar token em cookie
      setCookieToken(accessToken);

      // Configurar token para futuras requisições
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token: accessToken, refreshToken },
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      // Chamada de API para registro
      const response = await authService.register(name, email, password);
      const { user, accessToken, refreshToken } = response;

      console.log(response, "enter here");

      // Salvar token em cookie
      setCookieToken(accessToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user, token: accessToken, refreshToken },
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar conta";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };

  const refreshToken = async () => {
    try {
      const currentRefreshToken = state.refreshToken;

      if (!currentRefreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await authService.refreshToken(currentRefreshToken);

      const { accessToken: newToken, refreshToken: newRefreshToken } = response;

      setCookieToken(newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      dispatch({
        type: "REFRESH_TOKEN_SUCCESS",
        payload: { token: newToken, refreshToken: newRefreshToken },
      });
    } catch (error) {
      await logout();
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (state.refreshToken) {
        await authService.logout(state.refreshToken);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      removeCookieToken();
      delete api.defaults.headers.common["Authorization"];
      dispatch({ type: "LOGOUT" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshAuthToken: refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
