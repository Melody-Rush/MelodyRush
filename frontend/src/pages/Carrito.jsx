import React from 'react';
import { Link } from 'react-router-dom';

function Carrito({ carrito, eliminarDelCarrito, cambiarCantidad, vaciarCarrito }) {
  const total = carrito.reduce((sum, item) => sum + (Number(item.price) * item.cantidad), 0);

  if (carrito.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#1e1b4b' }}>🛒 Tu carrito está vacío</h2>
        <p style={{ color: '#6b7280', margin: '15px 0 25px 0' }}>Parece que aún no has añadido vinilos o CDs a tu pedido.</p>
        <Link to="/productos">
          <button style={{ backgroundColor: '#a855f7', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>
            Explorar catálogo
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', padding: '35px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#1e1b4b', borderBottom: '2px solid #a855f7', paddingBottom: '12px', margin: '0 0 25px 0' }}>
        🛒 Resumen de tu Compra
      </h2>

      {carrito.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', padding: '15px 0', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: '2', minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#111827', fontSize: '1.05rem' }}>{item.name}</h4>
            <small style={{ color: '#6b7280' }}>Precio unitario: ${Number(item.price).toLocaleString('es-CL')}</small>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>-</button>
            <span style={{ fontWeight: 'bold', padding: '0 5px' }}>{item.cantidad}</span>
            <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>+</button>
          </div>

          <div style={{ textAlign: 'right', minWidth: '120px' }}>
            <div style={{ fontWeight: 'bold', color: '#1e1b4b', fontSize: '1.1rem' }}>
              ${(Number(item.price) * item.cantidad).toLocaleString('es-CL')}
            </div>
            <button onClick={() => eliminarDelCarrito(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', marginTop: '4px' }}>
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <button onClick={vaciarCarrito} style={{ backgroundColor: '#f3f4f6', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Vaciar Carrito
        </button>

        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 5px 0', color: '#6b7280' }}>Total a pagar:</p>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#22c55e' }}>${total.toLocaleString('es-CL')}</h3>
          <button style={{ backgroundColor: '#1e1b4b', color: '#fff', border: 'none', padding: '14px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '15px' }}>
            Proceder al Pago 💳
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;