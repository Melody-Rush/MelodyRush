import React from 'react';

function Toast({ mensaje, visible }) {
  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#57249a',
      color: '#fffafa',
      padding: '14px 24px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(24, 21, 27, 0.4)',
      borderLeft: '5px solid #0e0d0f',
      zIndex: 10000,
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      animation: 'slideIn 0.3s ease'
    }}>
      <span>✨</span>
      <span>{mensaje}</span>
    </div>
  );
}

export default Toast;