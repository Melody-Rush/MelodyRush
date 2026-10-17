import React, { useState } from 'react';

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '15px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', color: '#1e1b4b', marginBottom: '10px' }}>CONTACTO</h2>
      <div style={{ width: '60px', height: '4px', backgroundColor: '#a855f7', margin: '0 auto 30px auto', borderRadius: '2px' }}></div>

      {enviado ? (
        <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>Nombre Completo</label>
            <input type="text" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>Correo Electrónico</label>
            <input type="email" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#374151', fontWeight: '500' }}>Mensaje</label>
            <textarea rows="4" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}></textarea>
          </div>
          <button type="submit" style={{ backgroundColor: '#1e1b4b', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Enviar Mensaje
          </button>
        </form>
      )}
    </div>
  );
}

export default Contacto;