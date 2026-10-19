import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-izq">
        <div className="superior-footer">
          <span className="site">Melody Rush</span>
          <div className="pagos">
            <div className="tarjeta">VISA</div>
            <div className="tarjeta">MC</div>
            <div className="tarjeta">AMEX</div>
          </div>
        </div>

        <div className="categorias-footer">
          <Link to="/productos">Álbumes</Link>
          <span> | </span>
          <Link to="/productos">Vinilos</Link>
          <span> | </span>
          <Link to="/productos">Ofertas</Link>
        </div>
      </div>

      <div className="footer-der">
        <p className="textonews">Escribe tu email para obtener noticias de nuestros productos.</p>
        <div className="newsletter">
          <input type="email" placeholder="Enter Email" />
          <button type="button">Subscribe</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;