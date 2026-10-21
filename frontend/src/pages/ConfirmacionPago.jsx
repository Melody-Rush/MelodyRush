import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

function ConfirmacionPago() {
  const [compra, setCompra] = useState(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('ultimaCompra');
    if (datosGuardados) {
      setCompra(JSON.parse(datosGuardados));
    }
  }, []);

  if (!compra) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No hay detalles de compra recientes.</h2>
        <Link to="/productos" style={{ color: '#a855f7', fontWeight: 'bold' }}>Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '30px auto', backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ width: '70px', height: '70px', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 15px auto' }}>
          ✓
        </div>
        <h1 style={{ color: '#1e1b4b', margin: '0 0 10px 0' }}>¡PAGO CONFIRMADO!</h1>
        <p style={{ color: '#4b5563', fontSize: '1.05rem', margin: 0 }}>
          Gracias por tu compra en <strong>Melody Rush</strong>. Hemos enviado el comprobante a tu correo.
        </p>
      </div>

      <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <small style={{ color: '#6b7280', display: 'block' }}>NÚMERO DE ORDEN</small>
          <strong style={{ color: '#111827', fontSize: '1.1rem' }}>#{compra.ordenId}</strong>
        </div>
        <div>
          <small style={{ color: '#6b7280', display: 'block' }}>FECHA</small>
          <strong style={{ color: '#111827' }}>{compra.fecha}</strong>
        </div>
        <div>
          <small style={{ color: '#6b7280', display: 'block' }}>ESTADO DE ENTREGA</small>
          <span style={{ backgroundColor: '#e0e7ff', color: '#4338ca', padding: '2px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            📦 En Preparación
          </span>
        </div>
      </div>

      <h3 style={{ color: '#1e1b4b', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        PRODUCTOS COMPRADOS
      </h3>

      <div style={{ marginBottom: '25px' }}>
        {compra.productos.map(prod => (
          <div key={prod.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src={
                  prod.image 
                    ? (prod.image.startsWith('http') ? prod.image : `${API_URL}${prod.image}`)
                    : '/img/no-image.png'
                } 
                alt={prod.name} 
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} 
              />
              <div>
                <h4 style={{ margin: 0, color: '#111827' }}>{prod.name}</h4>
                <small style={{ color: '#6b7280' }}>Cantidad: {prod.cantidad}</small>
              </div>
            </div>
            <strong style={{ color: '#1e1b4b' }}>
              ${(Number(prod.price) * prod.cantidad).toLocaleString('es-CL')}
            </strong>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '2px solid #1e1b4b', marginBottom: '30px' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>TOTAL PAGADO:</span>
        <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#16a34a' }}>
          ${Number(compra.total).toLocaleString('es-CL')}
        </span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/productos">
          <button style={{ backgroundColor: '#1e1b4b', color: '#fff', border: 'none', padding: '14px 35px', borderRadius: '25px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
            Volver a la Tienda 🛍️
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmacionPago;