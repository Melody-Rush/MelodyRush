import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Auth.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoserrores = {};

    const usuarioLimpio = correo.trim();

    if (!usuarioLimpio) {
      nuevoserrores.correo = 'El correo o nombre de usuario es obligatorio.';
    }
    if (!contrasena) {
      nuevoserrores.contrasena = 'La contraseña es obligatoria.';
    }

    setErrores(nuevoserrores);

    if (Object.keys(nuevoserrores).length === 0) {
      // 1. VERIFICACIÓN DE CREDENCIALES DE ADMINISTRADOR
      const esAdminUser = usuarioLimpio === 'Admin-Rush' || usuarioLimpio === 'Admin Rush' || usuarioLimpio.toLowerCase() === 'admin';
      const esAdminPass = contrasena === '12345678m';

      if (esAdminUser && esAdminPass) {
        const adminData = {
          username: 'Admin-Rush',
          email: 'admin@melodyrush.cl',
          is_staff: true
        };
        localStorage.setItem('token', 'token-admin-demo');
        localStorage.setItem('usuario', JSON.stringify(adminData));
        alert('¡Bienvenido al Panel de Administración!');
        navigate('/admin');
        return;
      }

      // 2. PETICIÓN A LA API DE DJANGO (Para usuarios normales y API activa)
      axios.post('http://127.0.0.1:8000/api/login/', {
        username: usuarioLimpio,
        password: contrasena
      })
      .then(res => {
        const usuarioData = res.data;
        localStorage.setItem('token', usuarioData.token || '');
        localStorage.setItem('usuario', JSON.stringify(usuarioData));

        if (usuarioData.is_staff || usuarioData.username === 'Admin-Rush') {
          alert('¡Bienvenido al Panel de Administración!');
          navigate('/admin');
        } else {
          alert('¡Inicio de sesión exitoso!');
          navigate('/');
        }
      })
      .catch(err => {
        console.error('Error al iniciar sesión:', err);
        setErrores({ backend: 'Credenciales inválidas o el servidor backend no respondió.' });
      });
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
              placeholder="correo@gmail.cl"
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

          <button type="submit" className="btn-auth">
            Iniciar sesión
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