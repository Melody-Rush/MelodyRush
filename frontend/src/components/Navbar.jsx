import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ totalUnidadesCarrito }) {
  const location = useLocation();
  const navigate = useNavigate();

  const usuarioGuardado = localStorage.getItem('usuario');
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  const usuario = usuarioGuardado && token ? JSON.parse(usuarioGuardado) : null;

  const esGestion =
    usuario && (usuario.rol === 'ADMIN' || usuario.rol === 'VENDEDOR' || usuario.is_staff);

  const handleCerrarSesion = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <>
      <header className="encabezado">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <img
            src="/img/logo.png"
            alt="Logo Melody Rush"
            onError={(e) => {
              e.target.src = '/img/Melody Rush.png';
            }}
          />
          <h2>
            Melody <span>Rush</span>
          </h2>
        </Link>

        <nav className="menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link to="/productos" className={location.pathname === '/productos' ? 'active' : ''}>
            Productos
          </Link>
          <Link to="/nosotros" className={location.pathname === '/nosotros' ? 'active' : ''}>
            Nosotros
          </Link>
          <Link to="/blogs" className={location.pathname === '/blogs' ? 'active' : ''}>
            Blogs
          </Link>
          <Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>
            Contacto
          </Link>
        </nav>

        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          <div className="carrito">
            🛒 <span>Carrito</span>
            <span className="badge" id="cart-count">
              {totalUnidadesCarrito}
            </span>
          </div>
        </Link>
      </header>

      {/* BARRA DE ACCESO CON PERSISTENCIA DE SESIÓN */}
      <div className="acceso">
        {usuario ? (
          <>
            <span style={{ fontWeight: 'bold', color: '#1e1b4b' }}>
              👤 {usuario.first_name || usuario.username} ({usuario.rol || 'CLIENTE'})
            </span>
            {esGestion && (
              <>
                <span>|</span>
                <Link to="/admin" style={{ color: '#a855f7', fontWeight: 'bold' }}>
                  Panel Gestión
                </Link>
              </>
            )}
            <span>|</span>
            <button
              onClick={handleCerrarSesion}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <span>|</span>
            <Link to="/registro">Registrarse</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;