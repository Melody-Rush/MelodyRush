import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from '../components/SidebarAdmin';
import './css/Admin.css';

function EditarProductos({ recargarProductos }) {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    code: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagenActual, setImagenActual] = useState('');

  // 1. Cargar los datos actuales del producto al entrar a la página
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/productos/${id}/`)
      .then((res) => {
        const data = res.data;
        setForm({
          code: data.code || '',
          name: data.name || data.nombre || '',
          category: data.category || data.categoria || '',
          price: data.price || data.precio || '',
          stock: data.stock || '',
          description: data.description || data.descripcion || ''
        });
        setImagenActual(data.image || data.imagen || '');
      })
      .catch((err) => {
        console.error('Error al cargar el producto:', err);
        alert('No se pudo cargar la información del producto.');
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // 2. Enviar los datos actualizados a Django (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('code', form.code);
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('description', form.description);

    // Solo adjuntamos la imagen si el usuario seleccionó un nuevo archivo
    if (imageFile) {
      formData.append('image', imageFile);
    }

    axios.put(`http://127.0.0.1:8000/api/productos/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(() => {
        alert('¡Producto actualizado correctamente!');
        if (recargarProductos) recargarProductos();
        navigate('/admin/productos');
      })
      .catch((err) => {
        const detalleError = err.response ? err.response.data : 'Error al actualizar el producto';
        console.error('Error detallado de Django:', detalleError);
        alert('Django dice: ' + JSON.stringify(detalleError));
      });
  };

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>¡EDITAR PRODUCTO!</h1>
          <div className="icon-campana-header">🔔</div>
        </header>
        <div className="barra-separadora"></div>

        <main>
          <div className="card-formulario">
            <form onSubmit={handleSubmit}>
              
              <div className="grid-2-columnas">
                <div className="grupo-campo">
                  <label htmlFor="code">Código del Producto *</label>
                  <input type="text" id="code" name="code" value={form.code} onChange={handleChange} required />
                </div>

                <div className="grupo-campo">
                  <label htmlFor="name">Nombre del Producto / Álbum *</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid-2-columnas">
                <div className="grupo-campo">
                  <label htmlFor="category">Categoría *</label>
                  <select id="category" name="category" value={form.category} onChange={handleChange} required>
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="CD">CD</option>
                    <option value="Vinilo">Vinilo</option>
                    <option value="Cassette">Cassette</option>
                    <option value="Tocadiscos">Tocadiscos</option>
                    <option value="Toca CD">Toca CD</option>
                    <option value="Reproductor Cassette">Reproductor Cassette</option>
                  </select>
                </div>

                <div className="grupo-campo">
                  <label htmlFor="price">Precio ($) *</label>
                  <input type="number" id="price" name="price" step="0.01" min="0" value={form.price} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid-2-columnas">
                <div className="grupo-campo">
                  <label htmlFor="stock">Stock disponible *</label>
                  <input type="number" id="stock" name="stock" min="0" value={form.stock} onChange={handleChange} required />
                </div>

                <div className="grupo-campo">
                  <label htmlFor="image">Cambiar Imagen (Opcional)</label>
                  <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
                  {imagenActual && !imageFile && (
                    <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                      Imagen actual guardada en el servidor.
                    </small>
                  )}
                </div>
              </div>

              <div className="grupo-campo">
                <label htmlFor="description">Descripción del Producto</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows="4" 
                  value={form.description} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px', fontFamily: 'inherit' }}
                />
              </div>

              <div className="acciones-form">
                <button type="submit" className="btn-guardar">Actualizar Producto</button>
                <Link to="/admin/productos" className="btn-cancelar">Cancelar</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditarProductos;