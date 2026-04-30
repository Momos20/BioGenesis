import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from '../../components';

const fallbackImage = '/assets/about/fallback-equipo-medico.svg';

const categories = [
  {
    title: 'Diagnóstico clínico',
    image: '/assets/about/diagnostico.svg',
    description: 'Equipos para apoyo diagnóstico, imagenología, ultrasonido y lectura de variables clínicas.',
  },
  {
    title: 'Monitoreo hospitalario',
    image: '/assets/about/monitoreo.svg',
    description: 'Tecnología para seguimiento continuo de signos vitales, alarmas clínicas y control del paciente.',
  },
  {
    title: 'Terapia y soporte',
    image: '/assets/about/terapia.svg',
    description: 'Soluciones orientadas a tratamiento, soporte vital y acompañamiento de procedimientos médicos.',
  },
  {
    title: 'Rehabilitación',
    image: '/assets/about/rehabilitacion.svg',
    description: 'Equipos para recuperación funcional, terapia física y fortalecimiento de procesos de cuidado.',
  },
];

const stats = [
  { value: '+40', label: 'equipos biomédicos disponibles' },
  { value: '4', label: 'líneas principales de tecnología' },
  { value: '24/7', label: 'solicitud digital de cotizaciones' },
  { value: '100%', label: 'enfoque en tecnología médica' },
];

const steps = [
  {
    number: '01',
    title: 'Explora el catálogo',
    description: 'Revisa equipos por categoría, precio, garantía, fabricante y características técnicas.',
  },
  {
    number: '02',
    title: 'Agrega al carrito',
    description: 'Selecciona los equipos de interés y consolida la solicitud en una sola cotización.',
  },
  {
    number: '03',
    title: 'Agenda la cotización',
    description: 'Registra los datos de contacto para que el equipo comercial pueda revisar el requerimiento.',
  },
  {
    number: '04',
    title: 'Recibe acompañamiento',
    description: 'La propuesta se orienta según la necesidad clínica, técnica y presupuestal del cliente.',
  },
];

const values = [
  'Tecnología médica confiable',
  'Cotización personalizada',
  'Información clara para decidir',
  'Enfoque académico y biomédico',
];

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <span className="about-eyebrow">Sobre BioGenesis</span>
                <h1 className="about-title">Tecnología médica por encargo, con una experiencia clara y moderna.</h1>
                <p className="about-lead">
                  BioGenesis es una empresa ficticia creada en el curso de Desarrollo de Aplicaciones Web del programa de Bioingeniería de la Universidad de Antioquia. La plataforma simula un catálogo para comercializar equipos biomédicos mediante solicitudes de cotización personalizadas.
                </p>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Link to="/product" className="btn btn-dark btn-lg">
                    Explorar catálogo
                  </Link>
                  <Link to="/contact" className="btn btn-outline-dark btn-lg">
                    Contactar
                  </Link>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="about-highlight-card">
                  <div className="about-highlight-card__icon">
                    <i className="fa fa-heartbeat" />
                  </div>
                  <h2>Soluciones biomédicas para instituciones de salud</h2>
                  <p>
                    El objetivo es facilitar la exploración de productos, la comparación de características y la solicitud de cotizaciones desde una interfaz web sencilla.
                  </p>
                  <div className="about-highlight-card__chips">
                    <span>Diagnóstico</span>
                    <span>Monitoreo</span>
                    <span>Terapia</span>
                    <span>Rehabilitación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-stats-section">
          <div className="container">
            <div className="about-stats-grid">
              {stats.map((stat) => (
                <div className="about-stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-lg-8">
                <span className="about-eyebrow">Portafolio</span>
                <h2 className="about-section-title">Líneas de productos</h2>
                <p className="about-section-text">
                  Las imágenes de esta sección ahora son locales, por lo que no dependen de enlaces externos que puedan caerse o bloquearse.
                </p>
              </div>
            </div>

            <div className="row g-4">
              {categories.map((category) => (
                <div key={category.title} className="col-xl-3 col-md-6">
                  <article className="about-category-card">
                    <div className="about-category-card__image-wrapper">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="about-category-card__image"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                    <div className="about-category-card__body">
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section about-section--soft">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <span className="about-eyebrow">Proceso</span>
                <h2 className="about-section-title">Cómo funciona la solicitud de cotización</h2>
                <p className="about-section-text">
                  La experiencia está pensada para que el usuario pase del catálogo al carrito y luego a una solicitud formal sin perder información del producto.
                </p>
              </div>
              <div className="col-lg-7">
                <div className="about-process-grid">
                  {steps.map((step) => (
                    <article className="about-process-card" key={step.number}>
                      <span>{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="container">
            <div className="about-values-card">
              <div>
                <span className="about-eyebrow">Diferencial</span>
                <h2 className="about-section-title mb-3">Una plataforma más ordenada, visual y fácil de mantener</h2>
                <p className="about-section-text mb-0">
                  El proyecto ahora tiene páginas separadas, servicios para la API, variables de entorno y componentes reutilizables. Esto facilita hacer cambios visuales, corregir errores y escalar nuevas funcionalidades.
                </p>
              </div>
              <div className="about-values-list">
                {values.map((value) => (
                  <div className="about-value-item" key={value}>
                    <i className="fa fa-check" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-cta-section">
          <div className="container">
            <div className="about-cta-card">
              <div>
                <span className="about-eyebrow about-eyebrow--light">Cotización personalizada</span>
                <h2>¿Listo para revisar equipos médicos?</h2>
                <p>Explora el catálogo, compara productos y arma una solicitud de cotización desde el carrito.</p>
              </div>
              <Link to="/product" className="btn btn-light btn-lg">
                Ver productos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
