import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-5">
            <h2>BioGenesis</h2>
            <p>
              Catálogo académico de tecnología médica para solicitudes de cotización, desarrollado como proyecto web de Bioingeniería.
            </p>
          </div>
          <div className="col-md-3 col-lg-2">
            <h3>Navegación</h3>
            <Link to="/">Inicio</Link>
            <Link to="/product">Productos</Link>
            <Link to="/about">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
          </div>
          <div className="col-md-4 col-lg-3">
            <h3>Líneas</h3>
            <span>Diagnóstico</span>
            <span>Monitoreo</span>
            <span>Terapia</span>
            <span>Rehabilitación</span>
          </div>
          <div className="col-md-5 col-lg-2">
            <h3>Proyecto</h3>
            <p className="mb-0 small">Universidad de Antioquia · Bioingeniería · Desarrollo de aplicaciones web</p>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 BioGenesis</span>
          <span>Proyecto académico ficticio</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
