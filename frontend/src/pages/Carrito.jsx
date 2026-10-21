import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

// Monto objetivo para activar el envío gratuito (por ejemplo $45.000 CLP)
const MONTO_ENVIO_GRATIS = 45000;

function Carrito({ carrito, eliminarDelCarrito, cambiarCantidad, vaciarCarrito }) {
  const [procesando, setProcesando] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const navigate = useNavigate();

  const total = carrito.reduce((sum, item) => sum + (Number(item.price) * (item.cantidad || 1)), 0);

  // Cálculo de progreso para el envío gratis
  const faltanteEnvio = MONTO_ENVIO_GRATIS - total;
  const porcentajeEnvio = Math.min(100, (total / MONTO_ENVIO_GRATIS) * 100);

  const handleProcesarPago = () => {
    if (carrito.length === 0) return;

    setProcesando(true);

    // Simulación de 3 segundos de procesamiento
    setTimeout(() => {
      setProcesando(false);
      setPagoExitoso(true);

      const resumenCompra = {
        ordenId: `MR-${Math.floor(100000 + Math.random() * 900000)}`,
        fecha: new Date().toLocaleDateString('es-CL'),
        productos: [...carrito],
        total: total,
        envioGratis: total >= MONTO_ENVIO_GRATIS
      };
      localStorage.setItem('ultimaCompra', JSON.stringify(resumenCompra));

      setTimeout(() => {
        vaciarCarrito();
        navigate('/confirmacion-pago');
      }, 1200);

    }, 3000);
  };

  if (carrito.length === 0 && !pagoExitoso) {
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
      
      {/* ========================================================= */}
      {/* BARRA DE PROGRESO DE ENVÍO GRATIS                         */}
      {/* ========================================================= */}
      <div style={{
        backgroundColor: total >= MONTO_ENVIO_GRATIS ? '#f0fdf4' : '#faf5ff',
        border: `1.5px solid ${total >= MONTO_ENVIO_GRATIS ? '#bbf7d0' : '#e9d5ff'}`,
        padding: '18px 22px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', color: total >= MONTO_ENVIO_GRATIS ? '#166534' : '#6b21a8', fontSize: '0.98rem' }}>
            {total >= MONTO_ENVIO_GRATIS ? (
              '🎉 ¡FELICIDADES! TIENES ENVÍO GRATIS A TODO CHILE 🚚'
            ) : (
              `🚚 Estás a $${faltanteEnvio.toLocaleString('es-CL')} de conseguir ENVÍO GRATIS`
            )}
          </span>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#6b7280' }}>
            {Math.round(porcentajeEnvio)}%
          </span>
        </div>

        {/* Barra de progreso visual */}
        <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${porcentajeEnvio}%`,
            backgroundColor: total >= MONTO_ENVIO_GRATIS ? '#22c55e' : '#a855f7',
            transition: 'width 0.5s ease-in-out, background-color 0.3s ease'
          }} />
        </div>
      </div>

      <h2 style={{ color: '#1e1b4b', borderBottom: '2px solid #a855f7', paddingBottom: '12px', margin: '0 0 25px 0' }}>
        🛒 Resumen de tu Compra
      </h2>

      {/* LISTA DE PRODUCTOS */}
      {carrito.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', padding: '15px 0', flexWrap: 'wrap', gap: '15px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '2', minWidth: '220px' }}>
            <img 
              src={
                item.image 
                  ? (item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`)
                  : '/img/no-image.png'
              } 
              alt={item.name} 
              style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} 
            />
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#111827', fontSize: '1.05rem' }}>{item.name}</h4>
              <small style={{ color: '#6b7280' }}>Precio unitario: ${Number(item.price).toLocaleString('es-CL')}</small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} disabled={procesando} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>-</button>
            <span style={{ fontWeight: 'bold', padding: '0 5px' }}>{item.cantidad}</span>
            <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} disabled={procesando} style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}>+</button>
          </div>

          <div style={{ textAlign: 'right', minWidth: '120px' }}>
            <div style={{ fontWeight: 'bold', color: '#1e1b4b', fontSize: '1.1rem' }}>
              ${(Number(item.price) * item.cantidad).toLocaleString('es-CL')}
            </div>
            <button onClick={() => eliminarDelCarrito(item.id)} disabled={procesando} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', marginTop: '4px' }}>
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {/* RESUMEN FINAL Y BOTÓN DE PAGO */}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <button onClick={vaciarCarrito} disabled={procesando} style={{ backgroundColor: '#f3f4f6', color: '#ef4444', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Vaciar Carrito
        </button>

        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 5px 0', color: '#6b7280' }}>Total a pagar:</p>
          <h3 style={{ margin: 0, fontSize: '2rem', color: '#22c55e' }}>${total.toLocaleString('es-CL')}</h3>
          
          <button 
            onClick={handleProcesarPago}
            disabled={procesando || pagoExitoso}
            style={{ 
              backgroundColor: pagoExitoso ? '#22c55e' : '#1e1b4b', 
              color: '#fff', 
              border: 'none', 
              padding: '14px 30px', 
              borderRadius: '8px', 
              cursor: procesando || pagoExitoso ? 'not-allowed' : 'pointer', 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              marginTop: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'background-color 0.3s ease'
            }}
          >
            {procesando ? (
              <>
                <span className="spinner-ruedita"></span>
                Procesando pago...
              </>
            ) : pagoExitoso ? (
              <>¡Pago Exitoso! ✓</>
            ) : (
              <>Proceder al Pago 💳</>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner-ruedita {
          width: 16px;
          height: 16px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Carrito;