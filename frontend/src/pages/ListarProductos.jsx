import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from '../components/SidebarAdmin';
import './css/Admin.css';

function ListarProductos({ productos, recargarProductos }) {
  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      axios.delete(`http://127.0.0.1:8000/api/productos/${id}/`)
        .then(() => {
          alert('Producto eliminado.');
          if (recargarProductos) recargarProductos();
        })
        .catch((err) => console.error('Error al eliminar producto:', err));
    }
  };

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>LISTADO DE PRODUCTOS</h1>
          <Link to="/admin/productos/agregar" className="btn-auth" style={{ width: 'auto', margin: 0, padding: '10px 20px' }}>
            + Agregar Producto
          </Link>
        </header>
        <div className="barra-separadora"></div>

        <main>
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No hay productos registrados.
                  </td>
                </tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <img src={prod.image || '/img/soda.webp'} alt={prod.name} />
                    </td>
                    <td>{prod.name}</td>
                    <td>{prod.category}</td>
                    <td>${Number(prod.price).toLocaleString('es-CL')}</td>
                    <td>{prod.stock}</td>
                    <td>
                      <Link to={`/admin/productos/editar/${prod.id}`} className="btn-accion-editar" style={{ marginRight: '8px' }}>
                        Editar
                      </Link>
                      <button onClick={() => eliminarProducto(prod.id)} className="btn-accion-eliminar">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

export default ListarProductos;