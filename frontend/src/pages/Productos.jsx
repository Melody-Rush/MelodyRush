import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Productos.css';

function Productos({ productos, agregarAlCarrito }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('todas');
  const URL_BASE_DJANGO = 'http://127.0.0.1:8000';

  // Obtener categorías únicas presentes en la lista de productos
  const categorias = ['todas', ...new Set(productos.map(p => p.category).filter(Boolean))];

  // Lógica de filtrado por nombre y por categoría
  const productosFiltrados = productos.filter(prod => {
    const nombreValido = prod.name ? prod.name.toLowerCase().includes(busqueda.toLowerCase()) : false;
    const categoriaValida = categoriaSel === 'todas' || prod.category === categoriaSel;
    return nombreValido && categoriaValida;
  });

  return (
    <main>
      <h2 className="text-center">NUESTRO CATÁLOGO</h2>

      {/* SECCIÓN DE FILTROS Y BÚSQUEDA */}
      <section className="filtros-tienda">
        <input 
          type="text" 
          placeholder="Buscar vinilo o álbum..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select 
          value={categoriaSel}
          onChange={(e) => setCategoriaSel(e.target.value)}
        >
          {categorias.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat === 'todas' ? 'Todas las categorías' : cat}
            </option>
          ))}
        </select>
      </section>

      {/* GRILLA DE PRODUCTOS */}
      <section className="grid-productos">
        {productosFiltrados.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b', fontSize: '16px' }}>
            No se encontraron productos que coincidan con los criterios de búsqueda.
          </p>
        ) : (
          productosFiltrados.map(prod => (
            <article key={prod.id} className="tarjeta-producto producto">
              <Link to={`/producto/${prod.id}`} className="enlace-detalle">
                <img 
                  src={
                    prod.image 
                      ? (prod.image.startsWith('http') ? prod.image : `${URL_BASE_DJANGO}${prod.image}`)
                      : '/img/no-image.png'
                  } 
                  alt={prod.name} 
                />
                <span className="categoria-badge">{prod.category || 'Álbum'}</span>
                <h3 className="productoti">{prod.name}</h3>
              </Link>

              <div className="info">
                <span>Stock: {prod.stock}</span>
                <span>${Number(prod.price).toLocaleString('es-CL')}</span>
              </div>

              <button onClick={() => agregarAlCarrito(prod)}>
                Añadir al carrito
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Productos;