import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Auth.css';
// ❌ Ya no necesitamos el import del logo porque está en la carpeta 'public'

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});

  const correoPermitido = (email) => {
    const patron = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patron.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoserrores = {};

    if (!correo.trim()) {
      nuevoserrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!correoPermitido(correo.trim())) {
      nuevoserrores.correo = 'Ingresa un correo válido (duoc.cl, profesor.duoc.cl o gmail.com).';
    }

    if (!contrasena) {
      nuevoserrores.contrasena = 'La contraseña es obligatoria.';
    }

    setErrores(nuevoserrores);

    if (Object.keys(nuevoserrores).length === 0) {
      alert('¡Inicio de sesión exitoso!');
    }
  };

  return (
    <div className="login">
      {/* ✅ Llamamos a la imagen directamente desde la raíz (public) */}
      <div className="logo-login">
        <img src="/img/Melody Rush.png" alt="Logo de Melody Rush" />
      </div>

      <h2 className="nombremp">Melody Rush</h2>

      <div className="formulario-login">
        <h2 className="titulo-login">Inicio de sesión</h2>

        <form id="formLogin" onSubmit={handleSubmit} noValidate>
          <div className="campos">
            <label htmlFor="correoLogin">CORREO</label>
            <input
              type="email"
              id="correoLogin"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={errores.correo ? 'input-error' : ''}
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