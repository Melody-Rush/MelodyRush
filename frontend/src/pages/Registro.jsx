import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { regionesComunas } from '../utils/regionesComunas';
import './css/Auth.css';

// Apunta a la API de Render en producción y a localhost durante desarrollo
const API_URL = process.env.REACT_APP_API_URL || 'https://melody-rush-backend.onrender.com';

function Registro() {
  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    telefono: '',
    password: '',
    confirmarPassword: '',
    region: '',
    comuna: '',
    direccion: ''
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const correoPermitido = (email) => {
    const patron = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patron.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'region') {
      const reg = regionesComunas.find((item) => item.region === value);
      setComunasDisponibles(reg ? reg.comunas : []);
      setForm(prev => ({ ...prev, region: value, comuna: '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validar RUN
    const runTrim = form.run.trim();
    if (!runTrim) {
      newErrors.run = 'El RUN es obligatorio.';
    } else if (runTrim.length < 7 || runTrim.length > 9) {
      newErrors.run = 'El RUN debe tener entre 7 y 9 caracteres.';
    } else if (!/^[0-9]{6,8}[0-9Kk]$/.test(runTrim)) {
      newErrors.run = 'Ingrese el RUN sin puntos ni guión. Ej: 12345678K';
    }

    // Validar Nombre
    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (form.nombre.trim().length > 50) {
      newErrors.nombre = 'El nombre no puede superar los 50 caracteres.';
    }

    // Validar Apellidos
    if (!form.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son obligatorios.';
    } else if (form.apellidos.trim().length > 100) {
      newErrors.apellidos = 'Los apellidos no pueden superar los 100 caracteres.';
    }

    // Validar Correo
    if (!form.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.';
    } else if (form.correo.trim().length > 100) {
      newErrors.correo = 'El correo no puede superar los 100 caracteres.';
    } else if (!correoPermitido(form.correo.trim())) {
      newErrors.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    // Validar Teléfono
    if (form.telefono.trim() && !/^\+?[0-9\s]{8,15}$/.test(form.telefono.trim())) {
      newErrors.telefono = 'Ingrese un teléfono válido. Ej: +56 9 1234 5678.';
    }

    // Validar Contraseña
    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (form.password.length < 4 || form.password.length > 10) {
      newErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    // Confirmar Contraseña
    if (!form.confirmarPassword) {
      newErrors.confirmarPassword = 'Debe confirmar la contraseña.';
    } else if (form.password !== form.confirmarPassword) {
      newErrors.confirmarPassword = 'Las contraseñas no coinciden.';
    }

    // Validar Región, Comuna y Dirección
    if (!form.region) newErrors.region = 'Debe seleccionar una región.';
    if (!form.comuna) newErrors.comuna = 'Debe seleccionar una comuna.';
    if (!form.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria.';

    setErrores(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios.post(`${API_URL}/api/usuarios/`, form)
        .then(() => {
          alert('¡Registro realizado con éxito! Ahora puedes iniciar sesión.');
          setForm({
            run: '',
            nombre: '',
            apellidos: '',
            correo: '',
            fechaNacimiento: '',
            telefono: '',
            password: '',
            confirmarPassword: '',
            region: '',
            comuna: '',
            direccion: ''
          });
          setComunasDisponibles([]);
          navigate('/login');
        })
        .catch(error => {
          const detalleError = error.response ? error.response.data : 'Error de conexión con el servidor';
          console.error('Error al registrar usuario:', detalleError);
          
          if (typeof detalleError === 'object') {
            if (detalleError.run) {
              setErrores(prev => ({ ...prev, run: detalleError.run[0] }));
            } else if (detalleError.correo) {
              setErrores(prev => ({ ...prev, correo: detalleError.correo[0] }));
            } else {
              alert('Error al registrar: ' + JSON.stringify(detalleError));
            }
          } else {
            alert('Error al registrar: ' + detalleError);
          }
        });
    }
  };

  return (
    <div className="registro">
      <form className="formulario-registro" id="formRegistro" onSubmit={handleSubmit} noValidate>
        <h3>Registro de usuario</h3>

        <div className="campos">
          <label htmlFor="runRegistro">RUN</label>
          <input
            type="text"
            id="runRegistro"
            name="run"
            placeholder="12345678K"
            value={form.run}
            onChange={handleChange}
            className={errores.run ? 'input-error' : ''}
          />
          <span className="mserror" id="errorRunRegistro">
            {errores.run && `⚠️ ${errores.run}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="nombreRegistro">NOMBRE</label>
          <input
            type="text"
            id="nombreRegistro"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            className={errores.nombre ? 'input-error' : ''}
          />
          <span className="mserror" id="errorNombreRegistro">
            {errores.nombre && `⚠️ ${errores.nombre}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="apellidosRegistro">APELLIDOS</label>
          <input
            type="text"
            id="apellidosRegistro"
            name="apellidos"
            placeholder="Tus apellidos"
            value={form.apellidos}
            onChange={handleChange}
            className={errores.apellidos ? 'input-error' : ''}
          />
          <span className="mserror" id="errorApellidosRegistro">
            {errores.apellidos && `⚠️ ${errores.apellidos}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="correoRegistro">CORREO ELECTRÓNICO</label>
          <input
            type="email"
            id="correoRegistro"
            name="correo"
            placeholder="correo@duoc.cl"
            value={form.correo}
            onChange={handleChange}
            className={errores.correo ? 'input-error' : ''}
          />
          <span className="mserror" id="errorCorreoRegistro">
            {errores.correo && `⚠️ ${errores.correo}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="fechaRegistro">FECHA DE NACIMIENTO</label>
          <input
            type="date"
            id="fechaRegistro"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
          />
          <span className="mserror" id="errorFechaRegistro">
            {errores.fechaNacimiento && `⚠️ ${errores.fechaNacimiento}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="telefonoRegistro">TELÉFONO (OPCIONAL)</label>
          <input
            type="text"
            id="telefonoRegistro"
            name="telefono"
            placeholder="+56 9 1234 5678"
            value={form.telefono}
            onChange={handleChange}
            className={errores.telefono ? 'input-error' : ''}
          />
          <span className="mserror" id="errorTelefonoRegistro">
            {errores.telefono && `⚠️ ${errores.telefono}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="passwordRegistro">CONTRASEÑA</label>
          <input
            type="password"
            id="passwordRegistro"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={errores.password ? 'input-error' : ''}
          />
          <span className="mserror" id="errorPasswordRegistro">
            {errores.password && `⚠️ ${errores.password}`}
          </span>
        </div>

        <div className="campos">
          <label htmlFor="confirmarRegistro">CONFIRMAR CONTRASEÑA</label>
          <input
            type="password"
            id="confirmarRegistro"
            name="confirmarPassword"
            value={form.confirmarPassword}
            onChange={handleChange}
            className={errores.confirmarPassword ? 'input-error' : ''}
          />
          <span className="mserror" id="errorConfirmarRegistro">
            {errores.confirmarPassword && `⚠️ ${errores.confirmarPassword}`}
          </span>
        </div>

        <div className="ubicacion">
          <div className="campos">
            <label htmlFor="regionRegistro">REGIÓN</label>
            <select
              id="regionRegistro"
              name="region"
              value={form.region}
              onChange={handleChange}
              className={errores.region ? 'input-error' : ''}
            >
              <option value="">-- Seleccione la región --</option>
              {regionesComunas.map((item) => (
                <option key={item.region} value={item.region}>{item.region}</option>
              ))}
            </select>
            <span className="mserror" id="errorRegionRegistro">
              {errores.region && `⚠️ ${errores.region}`}
            </span>
          </div>

          <div className="campos">
            <label htmlFor="comunaRegistro">COMUNA</label>
            <select
              id="comunaRegistro"
              name="comuna"
              value={form.comuna}
              onChange={handleChange}
              disabled={!form.region}
              className={errores.comuna ? 'input-error' : ''}
            >
              <option value="">-- Seleccione la comuna --</option>
              {comunasDisponibles.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span className="mserror" id="errorComunaRegistro">
              {errores.comuna && `⚠️ ${errores.comuna}`}
            </span>
          </div>
        </div>

        <div className="campos">
          <label htmlFor="direccionRegistro">DIRECCIÓN</label>
          <input
            type="text"
            id="direccionRegistro"
            name="direccion"
            placeholder="Ej: Av. Arturo Prat #123, Depto 402"
            value={form.direccion}
            onChange={handleChange}
            className={errores.direccion ? 'input-error' : ''}
          />
          <span className="mserror" id="errorDireccionRegistro">
            {errores.direccion && `⚠️ ${errores.direccion}`}
          </span>
        </div>

        <button type="submit" className="btn-auth">
          REGISTRAR
        </button>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registro;