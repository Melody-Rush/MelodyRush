import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Componentes Reutilizables
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RutaProtegidaAdmin from './components/RutaProtegidaAdmin';
import MusicaFondo from './components/MusicaFondo'; // IMPORTADO

// Páginas Públicas (Cliente)
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';

// Páginas Administrador
import HomeAd from './pages/HomeAd';
import ListarProductos from './pages/ListarProductos';
import AgregarProductos from './pages/AgregarProductos';
import EditarProductos from './pages/EditarProductos';
import ListarU from './pages/ListarU';
import AgregarU from './pages/AgregarU';
import EditarU from './pages/EditarU';

// Constante para la URL del Backend (Render / Producción)
const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const location = useLocation();

  // Cargar lista global de productos desde la API de Django
  const cargarProductos = () => {
    axios.get(`${API_URL}/api/productos/`)
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos de la API:', err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ============================================================
  // FUNCIONES PARA CONTROLAR EL CARRITO DE COMPRAS
  // ============================================================
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
    alert(`¡${producto.name || 'Producto'} añadido al carrito! 🛒`);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const vaciarCarrito = () => {
    if (window.confirm('¿Deseas vaciar todo el carrito?')) {
      setCarrito([]);
    }
  };

  const totalUnidadesCarrito = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  // Detecta si estamos en una ruta de administración
  const esRutaAdmin = location.pathname.startsWith('/admin');

  // ============================================================
  // 1. VISTAS ADMINISTRADOR (PANTALLA COMPLETA SIN NAVBAR DE CLIENTE)
  // ============================================================
  if (esRutaAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={
          <RutaProtegidaAdmin><HomeAd /></RutaProtegidaAdmin>
        } />
        <Route path="/admin/productos" element={
          <RutaProtegidaAdmin><ListarProductos productos={productos} recargarProductos={cargarProductos} /></RutaProtegidaAdmin>
        } />
        <Route path="/admin/productos/agregar" element={
          <RutaProtegidaAdmin><AgregarProductos recargarProductos={cargarProductos} /></RutaProtegidaAdmin>
        } />
        <Route path="/admin/productos/editar/:id" element={
          <RutaProtegidaAdmin><EditarProductos recargarProductos={cargarProductos} /></RutaProtegidaAdmin>
        } />
        <Route path="/admin/usuarios" element={
          <RutaProtegidaAdmin><ListarU /></RutaProtegidaAdmin>
        } />
        <Route path="/admin/usuarios/agregar" element={
          <RutaProtegidaAdmin><AgregarU /></RutaProtegidaAdmin>
        } />
        <Route path="/admin/usuarios/editar/:id" element={
          <RutaProtegidaAdmin><EditarU /></RutaProtegidaAdmin>
        } />
      </Routes>
    );
  }

  // ============================================================
  // 2. VISTAS PÚBLICAS (CON NAVBAR Y FOOTER DE CLIENTE)
  // ============================================================
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar totalUnidadesCarrito={totalUnidadesCarrito} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={
            <Carrito 
              carrito={carrito} 
              eliminarDelCarrito={eliminarDelCarrito} 
              cambiarCantidad={cambiarCantidad} 
              vaciarCarrito={vaciarCarrito} 
            />
          } />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>

      {/* REPRODUCTOR FLOTANTE DE MÚSICA DE FONDO */}
      <MusicaFondo />

      <Footer />
    </div>
  );
}

export default App;