import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectRoute;
