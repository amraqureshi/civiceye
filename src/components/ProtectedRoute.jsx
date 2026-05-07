import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Logged in but doesn't have the right role, redirect to their dashboard or home
    if (userRole === 'official') {
      return <Navigate to="/official" />;
    } else {
      return <Navigate to="/citizen" />;
    }
  }

  return children;
}
