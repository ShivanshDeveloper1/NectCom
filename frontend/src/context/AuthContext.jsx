import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loginWithOTP = async (phone) => {
    console.log("OTP sent to", phone);
    return true;
  };

  const verifyOTP = async (phone, otp) => {
    console.log("Verified OTP", otp);
    setUser({ phone, name: "Guest User" });
    setToken("fake-token");
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginWithOTP, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};