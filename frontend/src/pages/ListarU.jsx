import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from '../components/SidebarAdmin';
import './css/Admin.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

function ListarU() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Obtener los usuarios de la base de datos al cargar el componente
  useEffect(() => {
    axios.get(`${API_URL}/api/usuarios/`)
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => console.error('Error al cargar usuarios de la BD:', err));
  }, []);

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Deseas eliminar este usuario de la base de datos?')) {
      axios.delete(`${API_URL}/api/usuarios/${id}/`)
        .then(() => {
          // Filtrar la lista actual para remover el usuario eliminado
          const nuevaLista = usuarios.filter((u) => u.id !== id);
          setUsuarios(nuevaLista);
          alert('Usuario eliminado correctamente.');
        })
        .catch(err => console.error('Error al eliminar:', err));
    }
  };

  const editarUsuario = (id) => {
    // Ya no usamos localStorage, pasamos el ID real de la base de datos por la URL
    navigate(`/admin/usuarios/editar/${id}`);
  };

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>LISTADO DE USUARIOS</h1>
          <Link to="/admin/usuarios/agregar" className="btn-auth" style={{ width: 'auto', margin: 0, padding: '10px 20px' }}>
            + Agregar Usuario
          </Link>
        </header>
        <div className="barra-separadora"></div>

        <main>
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Región / Comuna</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    No hay usuarios registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.run}</td>
                    <td>{u.nombre} {u.apellidos}</td>
                    <td>{u.correo}</td>
                    <td>{u.region} / {u.comuna}</td>
                    <td>
                      <button onClick={() => editarUsuario(u.id)} className="btn-accion-editar">
                        Editar
                      </button>
                      <button onClick={() => eliminarUsuario(u.id)} className="btn-accion-eliminar">
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

export default ListarU;