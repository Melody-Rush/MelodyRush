import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import './css/Auth.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    const usuarioLimpio = correo.trim();

    if (!usuarioLimpio) {
      nuevosErrores.correo = 'El correo o nombre de usuario es obligatorio.';
    }
    if (!contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria.';
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setCargando(true);
    try {
      const res = await api.post('/auth/login/', {
        username: usuarioLimpio,
        password: contrasena,
      });

      const usuarioData = res.data;

      // Persistencia segura de sesión y tokens JWT
      localStorage.setItem('access_token', usuarioData.access);
      localStorage.setItem('refresh_token', usuarioData.refresh);
      localStorage.setItem('token', usuarioData.access);
      localStorage.setItem('usuario', JSON.stringify(usuarioData));

      if (usuarioData.rol === 'ADMIN' || usuarioData.rol === 'VENDEDOR' || usuarioData.is_staff) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      const msj =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        'Credenciales inválidas o el servidor no respondió.';
      setErrores({ backend: msj });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login">
      <div className="logo-login">
        <img src="/img/Melody Rush.png" alt="Logo de Melody Rush" />
      </div>

      <h2 className="nombremp">Melody Rush</h2>

      <div className="formulario-login">
        <h2 className="titulo-login">Inicio de sesión</h2>

        {errores.backend && (
          <div className="mserror" style={{ marginBottom: '15px', textAlign: 'center' }}>
            ⚠️ {errores.backend}
          </div>
        )}

        <form id="formLogin" onSubmit={handleSubmit} noValidate>
          <div className="campos">
            <label htmlFor="correoLogin">CORREO / USUARIO</label>
            <input
              type="text"
              id="correoLogin"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={errores.correo ? 'input-error' : ''}
              placeholder="correo@gmail.com o 12345678K"
            />
            <span className="mserror" id="errorCorreoLogin">
              {errores.correo && `⚠️ ${errores.correo}`}
            </span>
          </div>

          <div className="campos">
            <label htmlFor="contrasenaLogin">CONTRASEÑA</label>
            <input
              type="password"
              id="contrasenaLogin"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className={errores.contrasena ? 'input-error' : ''}
            />
            <span className="mserror" id="errorContrasenaLogin">
              {errores.contrasena && `⚠️ ${errores.contrasena}`}
            </span>
          </div>

          <button type="submit" className="btn-auth" disabled={cargando}>
            {cargando ? 'Validando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;