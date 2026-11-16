import React from 'react';
import { Navigate } from 'react-router-dom';

function RutaProtegidaAdmin({ children, soloAdmin = false }) {
  const usuarioGuardado = localStorage.getItem('usuario');
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  const usuario = usuarioGuardado && token ? JSON.parse(usuarioGuardado) : null;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const rol = usuario.rol || (usuario.is_staff ? 'ADMIN' : 'CLIENTE');

  if (soloAdmin && rol !== 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  if (rol !== 'ADMIN' && rol !== 'VENDEDOR') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutaProtegidaAdmin;