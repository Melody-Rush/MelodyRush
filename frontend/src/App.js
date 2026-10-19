import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(res => {
        setProductos(res.data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al consultar API:', err);
        setCargando(false);
      });
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const totalUnidadesCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (cargando) {
    return (
      <div style={{ color: '#1e1b4b', textAlign: 'center', marginTop: '100px', fontWeight: 'bold' }}>
        Cargando catálogo...
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#f4f5f9', 
      minHeight: '100vh', 
      fontFamily: "'Segoe UI', sans-serif", 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between' 
    }}>
      <div>
        <Navbar totalUnidadesCarrito={totalUnidadesCarrito} />

        <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/productos" element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} cambiarCantidad={cambiarCantidad} vaciarCarrito={() => setCarrito([])} />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;