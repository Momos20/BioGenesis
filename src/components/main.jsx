import React from 'react';

const Main = () => {
  return (
    <section className="hero-section">
      <div className="container-fluid px-3 px-md-4">
        <div className="hero-card">
          <img
            className="hero-card__image"
            src="/assets/main.png.jpg"
            alt="Equipos médicos BioGenesis"
            loading="eager"
          />
          <div className="hero-card__overlay">
            <div className="hero-card__content">
              <span className="hero-card__eyebrow">Tecnología médica por encargo</span>
              <h1 className="hero-card__title">BioGenesis</h1>
              <p className="hero-card__text">
                Soluciones biomédicas con cotización personalizada para instituciones de salud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
