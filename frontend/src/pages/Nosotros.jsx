import React from 'react';

function Nosotros() {
  return (
    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '15px', maxWidth: '850px', margin: '0 auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#1e1b4b', textAlign: 'center', fontSize: '2.2rem', marginBottom: '10px' }}>SOBRE MELODY RUSH</h2>
      <div style={{ width: '60px', height: '4px', backgroundColor: '#a855f7', margin: '0 auto 30px auto', borderRadius: '2px' }}></div>
      
      <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1.05rem' }}>
        Nacimos en Chile con el propósito de conectar a los amantes de la música analógica y digital de alta fidelidad. Nos especializamos en la importación de vinilos de edición limitada, CDs remasterizados y mercadería oficial de bandas legendarias e independientes.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '40px' }}>
        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3 style={{ color: '#a855f7' }}>🔊 Alta Fidelidad</h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Todos nuestros discos son 100% originales e importados de sellos oficiales.</p>
        </div>
        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3 style={{ color: '#a855f7' }}>📦 Envíos Seguros</h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Empaque reforzado antishock para proteger tus vinilos en todo el trayecto.</p>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;