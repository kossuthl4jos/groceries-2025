import { createContext, useEffect, useState } from "react";
import { clearToken, getToken } from "../../utils/tokens";

export const AuthContext = createContext({
  authToken: getToken()?.userKey,
  userName: getToken()?.userName,
});

export const clearAuthToken = () => clearToken();

export function useAuth() {
  const [authToken, setAuthToken] = useState(getToken()?.userKey);
  const [userName, setUserName] = useState(getToken()?.userName);

  useEffect(() => {
    if (getToken() != null) {
      setAuthToken(getToken()?.userKey);
      setUserName(getToken()?.userName);
    }
  }, [getToken()]);

  return { authToken, userName };
}
