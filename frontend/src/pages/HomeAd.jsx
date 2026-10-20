import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import './css/Admin.css';

function HomeAd() {
  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>¡BIENVENIDO ADMIN!</h1>
          <div className="icon-campana-header">🦐</div>
        </header>
        <div className="barra-separadora"></div>

        <main style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '1.1rem', color: '#475569' }}>
            Selecciona una opción del menú lateral para administrar productos o usuarios del sistema Melody Rush.
          </p>
        </main>
      </div>
    </div>
  );
}

export default HomeAd;