import React, { useState, useRef } from 'react';

function MusicaFondo() {
  const [reproduciendo, setReproduciendo] = useState(false);
  const [volumen, setVolumen] = useState(0.3);
  const audioRef = useRef(null);

  const toggleMusica = () => {
    if (reproduciendo) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Error al reproducir audio:", err);
      });
    }
    setReproduciendo(!reproduciendo);
  };

  const handleVolumenChange = (e) => {
    const nuevoVolumen = parseFloat(e.target.value);
    setVolumen(nuevoVolumen);
    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      zIndex: 9999,
      backgroundColor: '#1e1b4b',
      color: '#fff',
      padding: '10px 18px',
      borderRadius: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      {/* RUTA AL ARCHIVO RENOMBRADO */}
      <audio ref={audioRef} src="/audio/ambiente.mp3" loop />

      <button 
        onClick={toggleMusica}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.95rem'
        }}
      >
        <span>{reproduciendo ? '🔊' : '🎵'}</span>
        <span>{reproduciendo ? 'Pausar Música' : 'Música de Fondo'}</span>
      </button>

      {reproduciendo && (
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={volumen} 
          onChange={handleVolumenChange}
          style={{ width: '65px', cursor: 'pointer', accentColor: '#a855f7' }}
          title="Volumen de fondo"
        />
      )}
    </div>
  );
}

export default MusicaFondo;