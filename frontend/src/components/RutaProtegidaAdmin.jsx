import React from 'react';
import { Navigate } from 'react-router-dom';

function RutaProtegidaAdmin({ children }) {
  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  if (!usuario || (!usuario.is_staff && usuario.username !== 'Admin-Rush')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegidaAdmin;