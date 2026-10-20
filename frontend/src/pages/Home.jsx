import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Home.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

function Home({ agregarAlCarrito }) {
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/productos/`)
      .then(res => {
        // Tomamos los primeros 4 productos para la grilla de destacados
        setDestacados(res.data.slice(0, 4));
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al conectar con la API de Django:', err);
        setErrorApi('No se pudo cargar el catálogo desde el servidor.');
        setCargando(false);
      });
  }, []);

  return (
    <div>
      {/* BANNER PRINCIPAL (HERO) */}
      <section className="home">
        <div className="home-texto">
          <h1>TIENDA ONLINE</h1>
          <p>Encuentra lo que buscas....</p>
          <Link to="/productos" className="boton-productos">⩢ ver productos</Link>
        </div>
        <div className="principal-imagen">
          {/* Imagen estática cargada localmente desde public/img/soda.webp */}
          <img src="/img/soda.webp" alt="Soda Stereo" /> 
        </div>
      </section>

      {/* SECCIÓN DE PRODUCTOS DESTACADOS DESDE NEON/DJANGO */}
      <section className="productos">
        <h2 className="text-center">PRODUCTOS DESTACADOS</h2>
        
        <div className="grid-productos contenedor-productos" id="contenedor-productos">
          {cargando ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
              Cargando productos destacados...
            </p>
          ) : errorApi ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#ef4444', fontWeight: 'bold' }}>
              {errorApi}
            </p>
          ) : destacados.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#64748b' }}>
              No hay productos destacados por el momento.
            </p>
          ) : (
            destacados.map(prod => (
              <div key={prod.id} className="tarjeta-producto producto">
                <Link 
                  to={`/producto/${prod.id}`} 
                  className="enlace-detalle" 
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', textAlign: 'center' }}
                >
                  <img 
                    src={
                      prod.image 
                        ? (prod.image.startsWith('http') ? prod.image : `${API_URL}${prod.image}`)
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
      </section>
    </div>
  );
}

export default Home;