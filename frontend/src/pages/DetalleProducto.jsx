import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetalleProducto({ productos, agregarAlCarrito }) {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const URL_BASE_DJANGO = 'http://127.0.0.1:8000';

  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/productos" style={{ color: '#a855f7' }}>Volver al catálogo</Link>
      </div>
    );
  }

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '40px', maxWidth: '900px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', minWidth: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {producto.image && (
          <img 
            src={producto.image.startsWith('http') ? producto.image : `${URL_BASE_DJANGO}${producto.image}`} 
            alt={producto.name}
            style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }}
          />
        )}
      </div>

      <div style={{ flex: '1.2', minWidth: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span style={{ backgroundColor: '#f3f4f6', color: '#6b7280', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {producto.category}
          </span>
          <h2 style={{ fontSize: '2rem', color: '#111827', margin: '15px 0 10px 0' }}>{producto.name}</h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>{producto.description || 'Sin descripción disponible.'}</p>
          <p style={{ color: '#a855f7', fontWeight: 'bold' }}>Stock disponible: {producto.stock}</p>
          <h3 style={{ fontSize: '2rem', color: '#1e1b4b', margin: '20px 0' }}>
            ${Number(producto.price).toLocaleString('es-CL')}
          </h3>
        </div>

        {/* Contador de unidades */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold', color: '#374151' }}>Cantidad:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <button 
                onClick={() => setCantidad(c => Math.max(1, c - 1))}
                style={{ padding: '8px 15px', border: 'none', backgroundColor: '#f3f4f6', cursor: 'pointer', fontWeight: 'bold' }}
              >-</button>
              <span style={{ padding: '8px 20px', fontWeight: 'bold' }}>{cantidad}</span>
              <button 
                onClick={() => setCantidad(c => Math.min(producto.stock, c + 1))}
                style={{ padding: '8px 15px', border: 'none', backgroundColor: '#f3f4f6', cursor: 'pointer', fontWeight: 'bold' }}
              >+</button>
            </div>
          </div>

          <button 
            onClick={handleAgregar}
            style={{ width: '100%', backgroundColor: '#1e1b4b', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            🛒 Añadir al carrito ({cantidad})
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;