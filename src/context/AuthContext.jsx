import React, { createContext, useContext, useState } from 'react';
import { users } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isStaff = () => currentUser?.role === 'staff';
  const isCustomer = () => currentUser?.role === 'customer';
  const isLoggedIn = () => !!currentUser;

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      isStaff,
      isCustomer,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
