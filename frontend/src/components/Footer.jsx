import React, { useState } from 'react';

function Footer() {
  const [correo, setCorreo] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');

  const handleSuscripcion = (e) => {
    e.preventDefault();
    setErrorCorreo('');
    setMensajeExito('');

    const correoLimpio = correo.trim();

    // Validar que no esté vacío y que contenga '@' y '.'
    if (!correoLimpio) {
      setErrorCorreo('Por favor, ingresa un correo electrónico.');
      return;
    }

    if (!correoLimpio.includes('@') || !correoLimpio.includes('.')) {
      setErrorCorreo('Ingresa un correo válido (debe incluir "@" y un dominio).');
      return;
    }

    // Éxito en la suscripción
    setMensajeExito('¡Te has suscrito con éxito! 🎉');
    setCorreo('');

    // Oculta el mensaje de éxito después de 4 segundos
    setTimeout(() => {
      setMensajeExito('');
    }, 4000);
  };

  return (
    <footer style={{ backgroundColor: '#18143d', color: '#fff', padding: '30px 20px', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* LOGO Y MEDIOS DE PAGO */}
        <div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>Melody Rush</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ backgroundColor: '#332d69', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>VISA</span>
            <span style={{ backgroundColor: '#332d69', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>MC</span>
            <span style={{ backgroundColor: '#332d69', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>AMEX</span>
          </div>
        </div>

        {/* FORMULARIO DE SUSCRIPCIÓN CON VALIDACIÓN */}
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#cbd5e1' }}>
            Escribe tu correo electrónico para obtener noticias de nuestros productos.
          </p>

          <form onSubmit={handleSuscripcion} noValidate>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Introduce tu correo electrónico"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                  if (errorCorreo) setErrorCorreo('');
                }}
                style={{
                  flex: '1',
                  minWidth: '220px',
                  padding: '10px 16px',
                  borderRadius: '20px',
                  border: errorCorreo ? '2px solid #ef4444' : '1px solid #475569',
                  outline: 'none',
                  backgroundColor: '#0f0c29',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#a855f7',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Suscribir
              </button>
            </div>

            {/* MENSAJES DE ERROR O ÉXITO */}
            {errorCorreo && (
              <small style={{ color: '#f87171', display: 'block', marginTop: '6px', fontWeight: 'bold' }}>
                ⚠️ {errorCorreo}
              </small>
            )}

            {mensajeExito && (
              <small style={{ color: '#4ade80', display: 'block', marginTop: '6px', fontWeight: 'bold' }}>
                {mensajeExito}
              </small>
            )}
          </form>
        </div>

      </div>
    </footer>
  );
}

export default Footer;