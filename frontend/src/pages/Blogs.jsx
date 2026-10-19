import React from 'react';
import './css/Blogs.css';

function Blogs() {
  return (
    <div className="contenedor-pagina-blogs">
      <h1 className="titulo-blogs">NOTICIAS MÁS RECIENTES</h1>
      <div className="linea-blogs"></div>

      <div className="contenedor-blog">
        {/* NOTICIA 1: LINKIN PARK */}
        <article className="blog">
          <div className="contenedor-texto">
            <h2>Linkin Park lanza un nuevo disco: Unshatter Film Soundtrack</h2>
            <p>
              Incluye 20 canciones grabadas en vivo en noviembre de 2024 durante su presentación en São Paulo.
            </p>
            <p>
              Este disco funciona como la banda sonora oficial del nuevo documental y película de la banda que documenta su reaparición y gira mundial con Emily Armstrong.
            </p>
            <p style={{ fontWeight: 'bold', color: '#c084fc', marginTop: '10px' }}>
              El álbum salió el 25 de septiembre de 2026.
            </p>
          </div>

          <div className="imagen-blog">
            <img 
              src="/img/imgblog/blog/Linkin Park.png" 
              alt="Linkin Park" 
            />
          </div>
        </article>

        {/* NOTICIA 2: VENTAS DE CDS */}
        <article className="blog">
          <div className="contenedor-texto">
            <h2>El retorno del CD: Ventas se disparan en 2026</h2>
            <p>
              Según datos de una de las plataformas de análisis de datos más reconocidas de la industria del entretenimiento, las ventas de CDs en Estados Unidos aumentaron un 16 % en el primer semestre de 2026, alcanzando las 16,3 millones de unidades.
            </p>
            <p>
              Además varios locatarios de tiendas de Compact Disc notan un aumento substancial de compra de discos de los años 2000s. Esto por un valor nostálgico y coleccionable a un precio accesible.
            </p>
            <button className="boton-caso" type="button">VER CASO</button>
          </div>

          <div className="imagen-blog">
            <img 
              src="/img/imgblog/blog/cd-store-shopping-BB-Espagnol-2022-billboard-1548.jpg" 
              alt="Colección de CDs" 
              onError={(e) => { 
                // Si la extensión real es .png o .webp en lugar de .jpg, la corrige automáticamente
                e.target.src = '/img/imgblog/blog/cd-store-shopping-BB-Espagnol-2.png'; 
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

export default Blogs;