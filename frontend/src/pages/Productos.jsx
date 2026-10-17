import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Productos.css';

function Productos({ productos, agregarAlCarrito }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('todas');
  const URL_BASE_DJANGO = 'http://127.0.0.1:8000';

  // Extraer categorías únicas disponibles en los productos
  const categorias = ['todas', ...new Set(productos.map(p => p.category).filter(Boolean))];

  // Filtrado dinámico por texto y categoría
  const productosFiltrados = productos.filter(prod => {
    const coincideNombre = prod.name.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSel === 'todas' || prod.category === categoriaSel;
    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="pagina-productos">
      <h1 className="titulo-catalogo">NUESTRO CATÁLOGO</h1>

      {/* BARRA DE BÚSQUEDA Y FILTRADO */}
      <div className="barra-filtros">
        <input 
          type="text" 
          placeholder="Buscar vinilo o álbum..." 
          className="buscador-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select 
          className="filtro-categoria"
          value={categoriaSel}
          onChange={(e) => setCategoriaSel(e.target.value)}
        >
          {categorias.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat === 'todas' ? 'Todas las categorías' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* GRILLA DE PRODUCTOS */}
      <div className="grid-catalogo">
        {productosFiltrados.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        ) : (
          productosFiltrados.map(prod => (
            <div key={prod.id} className="tarjeta-producto producto">
              <Link 
                to={`/producto/${prod.id}`} 
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', textAlign: 'center' }}
              >
                <img 
                  src={
                    prod.image 
                      ? (prod.image.startsWith('http') ? prod.image : `${URL_BASE_DJANGO}${prod.image}`)
                      : '/img/no-image.png'
                  } 
                  alt={prod.name} 
                />
                <span className="categoria-badge">{prod.category}</span>
                <h3 className="productoti">{prod.name}</h3>
              </Link>

              <div className="info">
                <span>Stock: {prod.stock}</span>
                <span>${Number(prod.price).toLocaleString('es-CL')}</span>
              </div>

              <button onClick={() => agregarAlCarrito(prod)}>
                Añadir al carrito
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Productos;