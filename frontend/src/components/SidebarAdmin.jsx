import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function SidebarAdmin() {
  const navigate = useNavigate();
  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const esAdmin = usuario?.rol === 'ADMIN' || usuario?.is_staff;

  const cerrarSesion = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <aside className="barra-Lateral">
      <h1>{esAdmin ? 'ADMINISTRACIÓN' : 'PANEL VENTAS'}</h1>
      <div className="barra-separadora"></div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active' : '')}>
              <h2>Home</h2>
            </NavLink>
          </li>

          {esAdmin && (
            <li style={{ marginTop: '15px' }}>
              <h2>Usuarios</h2>
              <ul>
                <li>
                  <NavLink to="/admin/usuarios" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <h2>Listar Usuarios</h2>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/usuarios/agregar" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <h2>Agregar Usuarios</h2>
                  </NavLink>
                </li>
              </ul>
            </li>
          )}

          <li style={{ marginTop: '15px' }}>
            <h2>Productos</h2>
            <ul>
              <li>
                <NavLink to="/admin/productos" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <h2>Listar Productos</h2>
                </NavLink>
              </li>
              {esAdmin && (
                <li>
                  <NavLink to="/admin/productos/agregar" className={({ isActive }) => (isActive ? 'active' : '')}>
                    <h2>Agregar Productos</h2>
                  </NavLink>
                </li>
              )}
            </ul>
          </li>

          <li style={{ marginTop: '15px' }}>
            <h2>Ventas</h2>
            <ul>
              <li>
                <NavLink to="/admin/boletas" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <h2>Boletas / Órdenes</h2>
                </NavLink>
              </li>
            </ul>
          </li>

          <li style={{ marginTop: '15px' }}>
            <NavLink to="/">
              <h2>Volver a Tienda</h2>
            </NavLink>
          </li>
        </ul>
      </nav>

      <button onClick={cerrarSesion} className="btn-cerrar-sesion-admin">
        Cerrar Sesión 🚪
      </button>
    </aside>
  );
}

export default SidebarAdmin;