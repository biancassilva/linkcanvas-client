import { TOKEN_EXPIRY_DAYS, TOKEN_KEY } from "@/lib/constants/auth";
import Cookies from "js-cookie";

export const setCookieToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: TOKEN_EXPIRY_DAYS,
    sameSite: "strict",
  });
};

export const getCookieToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeCookieToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};
