import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const STAFF_CODE = 'MHLE14';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Staff login: requires code MHLE14 + staff name
  const loginStaff = (code, staffName) => {
    if (code !== STAFF_CODE) {
      return { success: false, message: 'รหัสเจ้าหน้าที่ไม่ถูกต้อง' };
    }
    if (!staffName || staffName.trim().length === 0) {
      return { success: false, message: 'กรุณากรอกชื่อเจ้าหน้าที่' };
    }
    setCurrentUser({
      role: 'staff',
      displayName: staffName.trim(),
      loginAt: new Date().toISOString()
    });
    return { success: true };
  };

  // Customer login: just first name + last name
  const loginCustomer = (firstName, lastName) => {
    if (!firstName || firstName.trim().length === 0) {
      return { success: false, message: 'กรุณากรอกชื่อ' };
    }
    if (!lastName || lastName.trim().length === 0) {
      return { success: false, message: 'กรุณากรอกนามสกุล' };
    }
    setCurrentUser({
      role: 'customer',
      displayName: `${firstName.trim()} ${lastName.trim()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      loginAt: new Date().toISOString()
    });
    return { success: true };
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
      loginStaff,
      loginCustomer,
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
