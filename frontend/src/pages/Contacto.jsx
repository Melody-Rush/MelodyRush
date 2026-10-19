import React, { useState } from 'react';
import './css/Contacto.css';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    comentario: ''
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState(false);

  const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  const phoneRegex = /^(\+?56)?9\d{8}$|^[0-9]{8,12}$/;

  // Función reutilizable para validar cada campo según las reglas de negocio
  const validarCampo = (name, value) => {
    let err = '';
    const val = value.trim();

    if (name === 'nombre') {
      if (!val) err = 'El nombre completo es obligatorio.';
      else if (val.length > 100) err = 'El nombre no debe exceder 100 caracteres.';
    }

    if (name === 'correo') {
      const valLower = val.toLowerCase();
      if (!valLower) err = 'El correo es obligatorio.';
      else if (valLower.length > 100) err = 'El correo no debe exceder 100 caracteres.';
      else if (!dominiosPermitidos.some(domain => valLower.endsWith(domain))) {
        err = 'Permitido solo @duoc.cl, @profesor.duoc.cl o @gmail.com';
      }
    }

    if (name === 'telefono') {
      if (!val) err = 'El número de contacto es obligatorio.';
      else if (!phoneRegex.test(val)) {
        err = 'Ingresa un número válido (ej: +56912345678 o 912345678).';
      }
    }

    if (name === 'comentario') {
      if (!val) err = 'El comentario es obligatorio.';
      else if (val.length > 500) err = 'El comentario no debe exceder 500 caracteres.';
    }

    return err;
  };

  // Manejador de cambio con validación dinámica al escribir
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const errorMsg = validarCampo(name, value);
    setErrores(prev => ({ ...prev, [name]: errorMsg }));
  };

  // Manejador de envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {
      nombre: validarCampo('nombre', formData.nombre),
      correo: validarCampo('correo', formData.correo),
      telefono: validarCampo('telefono', formData.telefono),
      comentario: validarCampo('comentario', formData.comentario)
    };

    setErrores(nuevosErrores);

    const tieneErrores = Object.values(nuevosErrores).some(err => err !== '');

    if (!tieneErrores) {
      setMensajeExito(true);
      setFormData({ nombre: '', correo: '', telefono: '', comentario: '' });
      setErrores({});

      setTimeout(() => {
        setMensajeExito(false);
      }, 5000);
    }
  };

  return (
    <div className="main-container">
      <div className="contacto-wrapper">
        <div className="contacto-header">
          <h1>Contacto</h1>
          <p>¿Tienes dudas sobre algún vinilo o pedido? Escríbenos.</p>
        </div>

        <div className="form-card">
          <h2>FORMULARIO DE CONTACTO</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errores.nombre ? 'input-error' : ''}
                placeholder="Tu nombre completo"
              />
              <span className="error-msg">{errores.nombre}</span>
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico *</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errores.correo ? 'input-error' : ''}
                placeholder="ejemplo@duoc.cl o ejemplo@gmail.com"
              />
              <span className="error-msg">{errores.correo}</span>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Número de Contacto *</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errores.telefono ? 'input-error' : ''}
                placeholder="+56912345678"
              />
              <span className="error-msg">{errores.telefono}</span>
            </div>

            <div className="form-group">
              <label htmlFor="comentario">Comentario / Mensaje *</label>
              <textarea
                id="comentario"
                name="comentario"
                rows="4"
                value={formData.comentario}
                onChange={handleChange}
                className={errores.comentario ? 'input-error' : ''}
                placeholder="Escribe tu consulta aquí..."
              ></textarea>
              <div className="char-counter">
                <span>{formData.comentario.length}</span> / 500
              </div>
              <span className="error-msg">{errores.comentario}</span>
            </div>

            <button type="submit" className="btn-submit">
              Enviar Mensaje
            </button>
          </form>

          {mensajeExito && (
            <div className="alert-success">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacto;