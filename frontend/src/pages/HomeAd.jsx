import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import './css/Admin.css';

function HomeAd() {
  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const rol = usuario?.rol || (usuario?.is_staff ? 'ADMIN' : 'VENDEDOR');
  const nombre = usuario?.first_name || usuario?.username || '';

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>¡BIENVENIDO {nombre.toUpperCase()} ({rol})!</h1>
          <div className="icon-campana-header">🦐</div>
        </header>
        <div className="barra-separadora"></div>

        <main style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '1.1rem', color: '#475569' }}>
            {rol === 'ADMIN'
              ? 'Tienes acceso completo para administrar usuarios, roles, catálogo de productos y boletas en Melody Rush.'
              : 'Tienes acceso de consulta al catálogo de inventario y gestión de despacho de boletas.'}
          </p>
        </main>
      </div>
    </div>
  );
}

export default HomeAd;