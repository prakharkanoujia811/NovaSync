import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import API from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading]=useState(true);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    const userData = res.data.user ? res.data.user : res.data;
    setUser(userData);
  };

  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const res = await API.get("/auth/me");
          console.log("Auto-fetch User Data:", res.data);
          setUser(res.data.user);
        } catch (error) {
          console.error("Token invalid or expired", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
