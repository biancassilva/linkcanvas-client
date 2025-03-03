import api from "./api";

const PREFIX = "/auth";

export class AuthService {
  public async login(email: string, password: string): Promise<any> {
    try {
      const { data } = await api.post(`${PREFIX}/login`, { email, password });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<any> {
    try {
      const { data } = await api.post(`${PREFIX}/register`, {
        name,
        email,
        password,
      });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async logout(refreshToken: string): Promise<any> {
    try {
      const { data } = await api.post(`${PREFIX}/logout`, {
        refreshToken,
      });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    try {
      const { data } = await api.post(`${PREFIX}/refresh-token`, {
        refreshToken,
      });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async me(): Promise<any> {
    try {
      const { data } = await api.get(`${PREFIX}/me`);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
