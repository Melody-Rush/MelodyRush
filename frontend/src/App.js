import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// ==========================================
// COMPONENTE: VISTA DE CATÁLOGO / PRODUCTOS
// ==========================================
function Catalogo({ productos, agregarAlCarrito }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const URL_BASE_DJANGO = 'http://127.0.0.1:8000';

  const categoriasUnicas = ['Todas', ...new Set(productos.map(p => p.category))];

  const productosFiltrados = productos.filter(prod => {
    const coincideBusqueda = prod.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                             prod.code?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === 'Todas' || prod.category === categoria;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2.2rem', color: '#1e1b4b', letterSpacing: '2px', margin: '0 0 10px 0', fontWeight: '800' }}>
          PRODUCTOS
        </h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: '#a855f7', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      {/* Buscador y Filtros */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar artista, álbum o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '300px', padding: '12px 20px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none' }}
        />

        <select 
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ padding: '12px 20px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
        >
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>{cat === 'Todas' ? 'Todas las categorías' : cat}</option>
          ))}
        </select>
      </div>

      {/* Grid de Productos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' }}>
        {productosFiltrados.map(prod => (
          <div key={prod.id} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', position: 'relative' }}>
                {prod.image && (
                  <img 
                    src={prod.image.startsWith('http') ? prod.image : `${URL_BASE_DJANGO}${prod.image}`} 
                    alt={prod.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                )}
                <span style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                  {prod.category}
                </span>
              </div>
              <h3 style={{ textAlign: 'center', fontSize: '1.1rem', color: '#111827', margin: '15px 0 10px 0', fontWeight: 'bold' }}>{prod.name}</h3>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontSize: '0.85rem' }}>
                <span style={{ color: '#6b7280' }}>Stock: <strong>{prod.stock}</strong></span>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>${Number(prod.price).toLocaleString('es-CL')}</span>
              </div>

              <button 
                onClick={() => agregarAlCarrito(prod)}
                style={{ width: '100%', backgroundColor: '#1e1b4b', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE: VISTA DE CARRITO
// ==========================================
function CarritoVista({ carrito, vaciarCarrito }) {
  const total = carrito.reduce((sum, item) => sum + (Number(item.price) * item.cantidad), 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#1e1b4b', borderBottom: '2px solid #a855f7', paddingBottom: '10px' }}>🛒 Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', margin: '40px 0' }}>El carrito está vacío actualmente.</p>
      ) : (
        <div>
          {carrito.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <div>
                <h4 style={{ margin: 0, color: '#111' }}>{item.name}</h4>
                <small style={{ color: '#666' }}>Precio: ${Number(item.price).toLocaleString('es-CL')} | Cantidad: {item.cantidad}</small>
              </div>
              <strong style={{ color: '#1e1b4b' }}>${(Number(item.price) * item.cantidad).toLocaleString('es-CL')}</strong>
            </div>
          ))}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={vaciarCarrito} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' }}>Vaciar Carrito</button>
            <h3>Total: <span style={{ color: '#22c55e' }}>${total.toLocaleString('es-CL')}</span></h3>
          </div>
        </div>
      )}
    </div>
  );
}

// Vistas secundarias para navegación
const HomeVista = () => <div style={{ textAlign: 'center', padding: '50px' }}><h2>🏠 Inicio de Melody Rush</h2><p>Bienvenido a la tienda de vinilos y música más grande.</p></div>;
const NosotrosVista = () => <div style={{ textAlign: 'center', padding: '50px' }}><h2>👥 Sobre Nosotros</h2><p>Somos apasionados por la música de alta fidelidad en vinilo y CD.</p></div>;
const BlogsVista = () => <div style={{ textAlign: 'center', padding: '50px' }}><h2>📰 Blogs & Noticias</h2><p>Revisa las últimas novedades del mundo musical.</p></div>;
const ContactoVista = () => <div style={{ textAlign: 'center', padding: '50px' }}><h2>📞 Contacto</h2><p>Escríbenos a contacto@melodyrush.cl</p></div>;

// ==========================================
// COMPONENTE PRINCIPAL (APP)
// ==========================================
function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(res => {
        setProductos(res.data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setCargando(false);
      });
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const totalUnidadesCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (cargando) return <div style={{ color: '#1e1b4b', textAlign: 'center', marginTop: '100px' }}>Cargando datos desde Django REST...</div>;

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? '#fff' : '#ccc',
    textDecoration: 'none',
    borderBottom: location.pathname === path ? '2px solid #a855f7' : 'none',
    paddingBottom: '3px',
    fontWeight: '500'
  });

  return (
    <div style={{ backgroundColor: '#f4f5f9', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* BARRA DE NAVEGACIÓN CON LINKS DE REACT ROUTER */}
      <header style={{ backgroundColor: '#2d1b69', color: '#fff', padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.8rem' }}>🎶</span>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>Melody Rush</h1>
        </div>

        <nav style={{ display: 'flex', gap: '25px', fontSize: '0.95rem' }}>
          <Link to="/" style={navLinkStyle('/')}>Home</Link>
          <Link to="/productos" style={navLinkStyle('/productos')}>Productos</Link>
          <Link to="/nosotros" style={navLinkStyle('/nosotros')}>Nosotros</Link>
          <Link to="/blogs" style={navLinkStyle('/blogs')}>Blogs</Link>
          <Link to="/contacto" style={navLinkStyle('/contacto')}>Contacto</Link>
        </nav>

        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#5b21b6', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛒 Carrito <span style={{ backgroundColor: '#a855f7', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' }}>{totalUnidadesCarrito}</span>
          </button>
        </Link>
      </header>

      {/* RUTAS Y ENRUTAMIENTO MULTIPÁGINA */}
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <Routes>
          <Route path="/" element={<HomeVista />} />
          <Route path="/productos" element={<Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/nosotros" element={<NosotrosVista />} />
          <Route path="/blogs" element={<BlogsVista />} />
          <Route path="/contacto" element={<ContactoVista />} />
          <Route path="/carrito" element={<CarritoVista carrito={carrito} vaciarCarrito={() => setCarrito([])} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;