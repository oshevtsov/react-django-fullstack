import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { API_TOKEN_CREATE_URL, API_TOKEN_REFRESH_URL } from "./settings";

/* ----------------- 
   UTILITY FUNCTIONS
   ----------------- */
const fetchTokens = async (username, password) => {
  const loginData = {
    username,
    password,
  };

  const response = await fetch(
    API_TOKEN_CREATE_URL,
    getAuthOptions(JSON.stringify(loginData))
  );

  if (!response.ok) return { ok: false, tokens: null };

  const tokens = await response.json();
  return { ok: true, tokens: tokens };
};

const getAuthOptions = (body, method = "POST") => ({
  method: method,
  headers: {
    "Content-Type": "application/json",
  },
  body: body,
});

const saveTokens = (accessToken, refreshToken) => {
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);
};

const retrieveTokens = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  return { accessToken, refreshToken };
};

const clearTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

const getUserIdFromToken = (token) => jwt_decode(token).user_id;

/* ------------------
   AUTH API FUNCTIONS
   ------------------ */
const doLogin = async (username, password) => {
  const { ok, tokens } = await fetchTokens(username, password);
  if (!ok) return null;

  const { access: accessToken, refresh: refreshToken } = tokens;
  const user_id = getUserIdFromToken(accessToken);
  saveTokens(accessToken, refreshToken);
  return { id: user_id };
};

export const doRefreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  const response = await fetch(
    API_TOKEN_REFRESH_URL,
    getAuthOptions(JSON.stringify({ refresh: refreshToken }))
  );

  if (!response.ok) {
    clearTokens();
    return false;
  }

  const { access: accessToken } = await response.json();
  saveTokens(accessToken, refreshToken);
  return true;
};

export const getAuthHeader = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) return null;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const restoreSession = async () => {
  const { accessToken, refreshToken } = retrieveTokens();

  if (accessToken && refreshToken) {
    const sessionAlive = await doRefreshToken();
    if (sessionAlive) {
      const user_id = getUserIdFromToken(refreshToken);
      return { id: user_id };
    }
  }

  clearTokens();
  return null;
};

/* ------------
   AUTH CONTEXT
   ------------ */
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logIn = async (username, password) => {
    const user = await doLogin(username, password);
    setCurrentUser(user);
    return currentUser;
  };

  const logOut = () => {
    clearTokens();
    setCurrentUser(null);
  };

  useEffect(() => {
    restoreSession()
      .then((user) => setCurrentUser(user))
      .catch(console.error);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
