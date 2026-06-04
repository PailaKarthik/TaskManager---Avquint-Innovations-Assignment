import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("tm_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("tm_token") || "");
  const [loading, setLoading] = useState(true);

  const saveSession = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken || "");
    if (nextUser && nextToken) {
      localStorage.setItem("tm_user", JSON.stringify(nextUser));
      localStorage.setItem("tm_token", nextToken);
    } else {
      localStorage.removeItem("tm_user");
      localStorage.removeItem("tm_token");
    }
  };

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    saveSession(data.user, data.token);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register({ name, email, password });
    saveSession(data.user, data.token);
    return data;
  };

  const logout = () => saveSession(null, "");

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.me(token);
        if (mounted) {
          saveSession(data, token);
        }
      } catch {
        if (mounted) {
          saveSession(null, "");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ user, token, login, register, logout, loading }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
