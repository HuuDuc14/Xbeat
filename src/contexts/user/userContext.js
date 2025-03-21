import React, { createContext, useContext, useEffect, useState } from "react";

// Tạo context cho người dùng
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [formUserInfo, setFormUserInfo] = useState(null); // Để kiểm tra loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const id = extractUserIdFromToken(token);
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const storeUserInfo = localStorage.getItem("tokenUser");
      if (storeUserInfo) {
        const user = extractUserInfoFromToken(storeUserInfo);
        setFormUserInfo(user);
      } else {
        setFormUserInfo({});
      }
    }
  }, [userId]);

  const extractUserInfoFromToken = (tokenUser) => {
    try {
      const base64Url = tokenUser.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Lỗi giải mã tokenUser:", error);
      return {};
    }
  };

  const extractUserIdFromToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      return decoded.id;
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ userId, formUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
