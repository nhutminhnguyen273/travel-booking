import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import privateRoutes from './privateRoutes';
import publicRoutes from './publicRoutes';

const isAuthenticated = (): boolean => {
    return localStorage.getItem('token') !== null;
  };

const AppRoutes: React.FC = () => {
    return (
      <Routes>
        {/* Public routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
  
        {/* Private routes */}
        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              isAuthenticated() ? route.element : <Navigate to="/login" replace />
            }
          />
        ))}
      </Routes>
    );
  };
  
  export default AppRoutes;