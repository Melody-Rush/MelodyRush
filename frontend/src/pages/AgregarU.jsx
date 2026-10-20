import React, { useState } from 'react';
import axios from 'axios';
import SidebarAdmin from '../components/SidebarAdmin';
import { regionesComunas } from '../utils/regionesComunas';
import './css/Admin.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

function AgregarU() {
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
  const [mensajeExito, setMensajeExito] = useState('');

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
    else if (form.run.trim().length !== 9) errs.run = 'El RUN debe tener 9 caracteres.';
    else if (form.run.includes('.') || form.run.includes('-')) errs.run = 'Ingrese el RUN sin puntos ni guion.';

    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio.';
    if (!form.apellidos.trim()) errs.apellidos = 'Los apellidos son obligatorios.';

    const correoPattern = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!form.correo.trim()) errs.correo = 'El correo es obligatorio.';
    else if (!correoPattern.test(form.correo.trim())) errs.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';

    if (!form.password) errs.password = 'La contraseña es obligatoria.';
    else if (form.password.length < 4 || form.password.length > 10) errs.password = 'La contraseña debe tener entre 4 y 10 caracteres.';

    if (form.password !== form.confirmar) errs.confirmar = 'Las contraseñas no coinciden.';
    if (!form.region) errs.region = 'Seleccione una región.';
    if (!form.comuna) errs.comuna = 'Seleccione una comuna.';
    if (!form.direccion.trim()) errs.direccion = 'La dirección es obligatoria.';

    setErrores(errs);

    if (Object.keys(errs).length === 0) {
      // Envío de datos a la base de datos con Axios
      axios.post(`${API_URL}/api/usuarios/`, form)
        .then(response => {
          setMensajeExito('¡Usuario guardado correctamente en la Base de Datos!');
          setForm({
            run: '', nombre: '', apellidos: '', correo: '', fechaNacimiento: '',
            telefono: '', password: '', confirmar: '', region: '', comuna: '', direccion: ''
          });
          setComunasDisponibles([]);
          setTimeout(() => setMensajeExito(''), 4000);
        })
        .catch(error => {
          // Captura el detalle del error devuelto por Django
          const detalleError = error.response ? error.response.data : 'Error de conexión con el servidor';
          console.error('Error detallado de Django:', detalleError);
          alert('Django dice: ' + JSON.stringify(detalleError));
        });
    }
  };

  return (
    <div className="contenedor-pagina">
      <SidebarAdmin />
      <div className="contenedor-pri">
        <header>
          <h1>¡AGREGAR USUARIOS!</h1>
        </header>
        <div className="barra-separadora"></div>

        <main>
          <form id="formulario-usuarios" onSubmit={handleSubmit} noValidate>
            <label htmlFor="runRegistro">RUN</label>
            <input type="text" id="runRegistro" name="run" placeholder="12345678K" value={form.run} onChange={handleChange} className={errores.run ? 'input-error' : ''} />
            <small className="mserror">{errores.run}</small>

            <label htmlFor="nombreRegistro">Nombre</label>
            <input type="text" id="nombreRegistro" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} className={errores.nombre ? 'input-error' : ''} />
            <small className="mserror">{errores.nombre}</small>

            <label htmlFor="apellidosRegistro">Apellidos</label>
            <input type="text" id="apellidosRegistro" name="apellidos" placeholder="Tus apellidos" value={form.apellidos} onChange={handleChange} className={errores.apellidos ? 'input-error' : ''} />
            <small className="mserror">{errores.apellidos}</small>

            <label htmlFor="correoRegistro">Correo Electrónico</label>
            <input type="email" id="correoRegistro" name="correo" placeholder="correo@gmail.com" value={form.correo} onChange={handleChange} className={errores.correo ? 'input-error' : ''} />
            <small className="mserror">{errores.correo}</small>

            <label htmlFor="fechaRegistro">Fecha de Nacimiento</label>
            <input type="date" id="fechaRegistro" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />

            <label htmlFor="telefonoRegistro">Teléfono (opcional)</label>
            <input type="tel" id="telefonoRegistro" name="telefono" placeholder="+56 9 1234 5678" value={form.telefono} onChange={handleChange} />

            <label htmlFor="passwordRegistro">Contraseña</label>
            <input type="password" id="passwordRegistro" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} className={errores.password ? 'input-error' : ''} />
            <small className="mserror">{errores.password}</small>

            <label htmlFor="confirmarRegistro">Confirmar Contraseña</label>
            <input type="password" id="confirmarRegistro" name="confirmar" placeholder="••••••••" value={form.confirmar} onChange={handleChange} className={errores.confirmar ? 'input-error' : ''} />
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
            <input type="text" id="direccionRegistro" name="direccion" placeholder="Ej: Calle Arturo Prat #123" value={form.direccion} onChange={handleChange} className={errores.direccion ? 'input-error' : ''} />
            <small className="mserror">{errores.direccion}</small>

            <button type="submit" className="btn-auth">REGISTRAR</button>

            {mensajeExito && (
              <div className="caja-mensajes" style={{ backgroundColor: '#ccffcc', color: 'green', textAlign: 'center' }}>
                {mensajeExito}
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default AgregarU;