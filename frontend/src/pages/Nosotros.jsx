import React from 'react';
import './css/Nosotros.css';

function Nosotros() {
  return (
    <div className="contenedor-pagina-nosotros">
      {/* SECCIÓN 1: SOBRE MELODY RUSH */}
      <section className="tarjeta-sobre-nosotros">
        <h2>SOBRE MELODY RUSH</h2>
        <div className="linea-decorativa"></div>
        
        <p className="texto-mision">
          Nacimos en Chile con el propósito de conectar a los amantes de la música analógica y digital de alta fidelidad. Nos especializamos en la importación de vinilos de edición limitada, CDs remasterizados y mercadería oficial de bandas legendarias e independientes.
        </p>

        <div className="grid-caracteristicas">
          <div className="box-caracteristica">
            <h3>🔊 Alta Fidelidad</h3>
            <p>Todos nuestros discos son 100% originales e importados de sellos oficiales.</p>
          </div>
          <div className="box-caracteristica">
            <h3>📦 Envíos Seguros</h3>
            <p>Empaque reforzado antishock para proteger tus vinilos en todo el trayecto.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: CONOCE A NUESTRO EQUIPO */}
      <section>
        <h1 className="titulo-equipo">Conoce a nuestro equipo</h1>
        
        <div className="contenedor-descripcion">
          <p>
            Somos los encargados de traer música a tu hogar de una forma única. Melody-Rush existe para ti, para que vuelvas a tu casa de forma melódica y que todos los días sean especiales junto a tus discos preferidos y la inigualable experiencia de un vinilo.
          </p>
        </div>

        <div className="contenedor-nos">
          <article className="tarjeta-equipo contenedor-S">
            <h2>SOFIA OLIVO</h2>
            <p>Scrum master y desarrolladora Frontend</p>
          </article>

          <article className="tarjeta-equipo contenedor-C">
            <h2>CRISTOBAL RIQUELME</h2>
            <p>Product Owner y desarrollador FullStack</p>
          </article>

          <article className="tarjeta-equipo contenedor-J">
            <h2>JORGE MARTINEZ</h2>
            <p>QA y desarrollador FullStack</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Nosotros;