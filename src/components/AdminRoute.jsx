import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Kita simpan role saat login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    alert('Akses Ditolak: Anda bukan Admin!');
    return <Navigate to="/lapor" replace />;
  }

  return children;
}