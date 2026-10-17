import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ totalUnidadesCarrito }) {
  const location = useLocation();

  return (
    <>
      {/* ENCABEZADO PRINCIPAL */}
      <header className="encabezado">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <img 
            src="/img/logo.png" 
            alt="Logo Melody Rush" 
            onError={(e) => { e.target.src = "/img/Melody Rush.png"; }}
          /> 
          <h2>Melody <span>Rush</span></h2>
        </Link>

        <nav className="menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/productos" className={location.pathname === '/productos' ? 'active' : ''}>Productos</Link>
          <Link to="/nosotros" className={location.pathname === '/nosotros' ? 'active' : ''}>Nosotros</Link>
          <Link to="/blogs" className={location.pathname === '/blogs' ? 'active' : ''}>Blogs</Link>
          <Link to="/contacto" className={location.pathname === '/contacto' ? 'active' : ''}>Contacto</Link>
        </nav>

        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          <div className="carrito">
            🛒 <span>Carrito</span>
            <span className="badge" id="cart-count">{totalUnidadesCarrito}</span>
          </div>
        </Link>
      </header>

      {/* BARRA DE ACCESO (LOGIN / REGISTRO) */}
      <div className="acceso">
        <Link to="/login">Iniciar sesión</Link>
        <span>|</span>
        <Link to="/registro">Registrarse</Link>
      </div>
    </>
  );
}

export default Navbar;