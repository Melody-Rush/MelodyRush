import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '15px', maxWidth: '400px', margin: '40px auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', color: '#1e1b4b', marginBottom: '25px' }}>Iniciar Sesión</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Correo electrónico" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input type="password" placeholder="Contraseña" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <button type="submit" style={{ backgroundColor: '#1e1b4b', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginTop: '20px' }}>
        ¿No tienes cuenta? <Link to="/registro" style={{ color: '#a855f7', fontWeight: 'bold' }}>Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;