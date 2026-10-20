import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from '../components/SidebarAdmin';
import './css/Admin.css';

function AgregarProductos({ recargarProductos }) {
  const [form, setForm] = useState({
    code: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '' // NUEVO CAMPO: Descripción
  });
  
  // Estado especial para guardar el archivo de la imagen
  const [imageFile, setImageFile] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función que captura el archivo cuando lo seleccionas de tu PC
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FormData permite enviar archivos físicos junto con texto al backend
    const formData = new FormData();
    formData.append('code', form.code);
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    formData.append('description', form.description); // ENVIAMOS LA DESCRIPCIÓN
    
    if (imageFile) {
      formData.append('image', imageFile); 
    }

    // Header para el envío multipart/form-data
    axios.post('http://127.0.0.1:8000/api/productos/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(() => {
        alert('¡Producto agregado correctamente!');
        if (recargarProductos) recargarProductos();
        navigate('/admin/productos');
      })
      .catch((err) => {
        const detalleError = err.response ? err.response.data : 'Error de conexión con el servidor';
        console.error('Error detallado de Django:', detalleError);
        alert('Django dice: ' + JSON.stringify(detalleError));
      });
  };

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>¡AGREGAR PRODUCTO!</h1>
          <div className="icon-campana-header">🔔</div>
        </header>
        <div className="barra-separadora"></div>

        <main>
          <div className="card-formulario">
            <form onSubmit={handleSubmit}>
              
              <div className="grid-2-columnas">
                <div className="grupo-campo">
                  <label htmlFor="code">Código del Producto *</label>
                  <input type="text" id="code" name="code" placeholder="Ej. BEAT-01" value={form.code} onChange={handleChange} required />
                </div>

                <div className="grupo-campo">
                  <label htmlFor="name">Nombre del Producto / Álbum *</label>
                  <input type="text" id="name" name="name" placeholder="Ej. Abbey Road - The Beatles" value={form.name} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid-2-columnas">
                <div className="grupo-campo">
                  <label htmlFor="category">Categoría *</label>
                  <select id="category" name="category" value={form.category} onChange={handleChange} required >
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
                  <input type="number" id="price" name="price" step="0.01" min="0" placeholder="Ej. 19990" value={form.price} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid-2-columnas">
                <div className="grupo-campo">
                  <label htmlFor="stock">Stock disponible *</label>
                  <input type="number" id="stock" name="stock" min="0" placeholder="Ej. 15" value={form.stock} onChange={handleChange} required />
                </div>

                <div className="grupo-campo">
                  <label htmlFor="image">Imagen del Producto</label>
                  <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              {/* NUEVO CAMPO: DESCRIPCIÓN DEL PRODUCTO */}
              <div className="grupo-campo">
                <label htmlFor="description">Descripción del Producto</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows="4" 
                  placeholder="Escribe una breve descripción del producto, pista de canciones, edición, etc." 
                  value={form.description} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px', fontFamily: 'inherit' }}
                />
              </div>

              <div className="acciones-form">
                <button type="submit" className="btn-guardar">Guardar Producto</button>
                <Link to="/admin/productos" className="btn-cancelar">Cancelar</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AgregarProductos;