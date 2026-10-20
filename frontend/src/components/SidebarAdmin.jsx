import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function SidebarAdmin() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <aside className="barra-Lateral">
      <h1>ADMINISTRACIÓN</h1>
      <div className="barra-separadora"></div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active' : '')}>
              <h2>Home</h2>
            </NavLink>
          </li>

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

          <li style={{ marginTop: '15px' }}>
            <h2>Productos</h2>
            <ul>
              <li>
                <NavLink to="/admin/productos" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <h2>Listar Productos</h2>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/productos/agregar" className={({ isActive }) => (isActive ? 'active' : '')}>
                  <h2>Agregar Productos</h2>
                </NavLink>
              </li>
            </ul>
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