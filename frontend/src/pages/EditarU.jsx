import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from '../components/SidebarAdmin';
import { regionesComunas } from '../utils/regionesComunas';
import './css/Admin.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

function EditarU() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    telefono: '',
    password: '',
    confirmar: '',
    region: '',
    comuna: '',
    direccion: ''
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(true);

  // Cargar datos del usuario desde la base de datos de Django
  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/api/usuarios/${id}/`)
        .then(res => {
          const u = res.data;
          setForm({
            run: u.run || '',
            nombre: u.nombre || '',
            apellidos: u.apellidos || '',
            correo: u.correo || '',
            fechaNacimiento: u.fechaNacimiento || '',
            telefono: u.telefono || '',
            password: '',
            confirmar: '',
            region: u.region || '',
            comuna: u.comuna || '',
            direccion: u.direccion || ''
          });

          if (u.region) {
            const reg = regionesComunas.find((item) => item.region === u.region);
            setComunasDisponibles(reg ? reg.comunas : []);
          }
          setCargando(false);
        })
        .catch(err => {
          console.error('Error al cargar datos del usuario:', err);
          alert('No se pudo cargar la información del usuario desde la base de datos.');
          navigate('/admin/usuarios');
        });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'region') {
      const reg = regionesComunas.find((item) => item.region === value);
      setComunasDisponibles(reg ? reg.comunas : []);
      setForm({ ...form, region: value, comuna: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};

    if (!form.run.trim()) errs.run = 'El RUN es obligatorio.';
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.';
    if (!form.apellidos.trim()) errs.apellidos = 'Los apellidos son obligatorios.';

    const correoPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!form.correo.trim() || !correoPattern.test(form.correo.trim())) {
      errs.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    if (form.password && (form.password.length < 4 || form.password.length > 10)) {
      errs.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    if (form.password !== form.confirmar) errs.confirmar = 'Las contraseñas no coinciden.';
    if (!form.region) errs.region = 'Seleccione una región.';
    if (!form.comuna) errs.comuna = 'Seleccione una comuna.';
    if (!form.direccion.trim()) errs.direccion = 'La dirección es obligatoria.';

    setErrores(errs);

    if (Object.keys(errs).length === 0) {
      axios.put(`${API_URL}/api/usuarios/${id}/`, form)
        .then(() => {
          alert('¡Usuario actualizado correctamente en la base de datos!');
          navigate('/admin/usuarios');
        })
        .catch(err => {
          console.error('Error al actualizar usuario:', err);
          alert('Error al guardar los cambios en el servidor.');
        });
    }
  };

  if (cargando) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando datos del usuario...</div>;
  }

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>EDITAR USUARIO</h1>
        </header>
        <div className="barra-separadora"></div>

        <main>
          <form id="formulario-usuarios" onSubmit={handleSubmit} noValidate>
            <label htmlFor="runRegistro">RUN</label>
            <input type="text" id="runRegistro" name="run" value={form.run} onChange={handleChange} className={errores.run ? 'input-error' : ''} />
            <small className="mserror">{errores.run}</small>

            <label htmlFor="nombreRegistro">Nombre</label>
            <input type="text" id="nombreRegistro" name="nombre" value={form.nombre} onChange={handleChange} className={errores.nombre ? 'input-error' : ''} />
            <small className="mserror">{errores.nombre}</small>

            <label htmlFor="apellidosRegistro">Apellidos</label>
            <input type="text" id="apellidosRegistro" name="apellidos" value={form.apellidos} onChange={handleChange} className={errores.apellidos ? 'input-error' : ''} />
            <small className="mserror">{errores.apellidos}</small>

            <label htmlFor="correoRegistro">Correo Electrónico</label>
            <input type="email" id="correoRegistro" name="correo" value={form.correo} onChange={handleChange} className={errores.correo ? 'input-error' : ''} />
            <small className="mserror">{errores.correo}</small>

            <label htmlFor="fechaRegistro">Fecha de Nacimiento</label>
            <input type="date" id="fechaRegistro" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />

            <label htmlFor="telefonoRegistro">Teléfono (opcional)</label>
            <input type="tel" id="telefonoRegistro" name="telefono" value={form.telefono} onChange={handleChange} />

            <label htmlFor="passwordRegistro">Nueva Contraseña (Opcional)</label>
            <input type="password" id="passwordRegistro" name="password" value={form.password} onChange={handleChange} className={errores.password ? 'input-error' : ''} placeholder="Dejar en blanco para no cambiar" />
            <small className="mserror">{errores.password}</small>

            <label htmlFor="confirmarRegistro">Confirmar Contraseña</label>
            <input type="password" id="confirmarRegistro" name="confirmar" value={form.confirmar} onChange={handleChange} className={errores.confirmar ? 'input-error' : ''} />
            <small className="mserror">{errores.confirmar}</small>

            <div className="ubicacion">
              <div>
                <label htmlFor="regionRegistro">Región</label>
                <select id="regionRegistro" name="region" value={form.region} onChange={handleChange}>
                  <option value="">-- Seleccione la región --</option>
                  {regionesComunas.map((item) => (
                    <option key={item.region} value={item.region}>{item.region}</option>
                  ))}
                </select>
                <small className="mserror">{errores.region}</small>
              </div>

              <div>
                <label htmlFor="comunaRegistro">Comuna</label>
                <select id="comunaRegistro" name="comuna" value={form.comuna} onChange={handleChange} disabled={!form.region}>
                  <option value="">-- Seleccione la comuna --</option>
                  {comunasDisponibles.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <small className="mserror">{errores.comuna}</small>
              </div>
            </div>

            <label htmlFor="direccionRegistro">Dirección</label>
            <input type="text" id="direccionRegistro" name="direccion" value={form.direccion} onChange={handleChange} className={errores.direccion ? 'input-error' : ''} />
            <small className="mserror">{errores.direccion}</small>

            <button type="submit" className="btn-auth">GUARDAR CAMBIOS</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditarU;