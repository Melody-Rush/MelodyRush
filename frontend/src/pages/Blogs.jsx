import React from 'react';

function Blogs() {
  const articulos = [
    { id: 1, titulo: 'El resurgir del Vinilo en la era digital', fecha: '12 Octubre, 2026', resumen: 'Por qué el formato físico sigue ganando adeptos frente a las plataformas de streaming.' },
    { id: 2, titulo: 'Guía básica: Cómo cuidar tus discos de vinilo', fecha: '05 Septiembre, 2026', resumen: 'Limpieza, almacenamiento vertical y mantenimiento de la aguja para una experiencia sonora perfecta.' }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#1e1b4b', fontSize: '2.2rem', margin: '0 0 10px 0' }}>BLOGS & NOTICIAS</h2>
      <div style={{ width: '60px', height: '4px', backgroundColor: '#a855f7', margin: '0 auto 40px auto', borderRadius: '2px' }}></div>

      <div style={{ display: 'grid', gap: '25px' }}>
        {articulos.map(art => (
          <article key={art.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <span style={{ color: '#a855f7', fontSize: '0.85rem', fontWeight: 'bold' }}>{art.fecha}</span>
            <h3 style={{ color: '#111827', margin: '8px 0', fontSize: '1.3rem' }}>{art.titulo}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{art.resumen}</p>
            <button style={{ backgroundColor: 'transparent', color: '#1e1b4b', border: 'none', padding: 0, fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Leer artículo completo →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blogs;