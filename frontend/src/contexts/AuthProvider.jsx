import { useEffect } from "react";
import AuthContext from "./AuthContext";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";

export function AuthProvider({ children }) {
  const {
    token,
    user,
    setUser,
    logout,
  } = useAuthStore();

  useEffect(() => {
    async function loadUser() {
      if (!token) return;

      try {
        const response = await authApi.me();
        setUser(response.data);
      } catch {
        logout();
      }
    }

    loadUser();
  }, [token, setUser, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}