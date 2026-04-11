import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Jika tidak punya token, paksa pindah ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika punya token, persilakan masuk
  return children;
}