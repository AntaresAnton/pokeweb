import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://placehold.co/1920x500/FF0000/FFFFFF/png?text=Explora+el+Mundo+Pokemon" className="d-block w-100" alt="Pokemon Banner 1" />
              <div className="carousel-caption" data-aos="fade-up">
                <h2 className="pokemon-font">Explora el Mundo Pokémon</h2>
                <p>Descubre información detallada sobre tus Pokémon favoritos</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://placehold.co/1920x500/3B4CCA/FFFFFF/png?text=Bayas+y+Objetos" className="d-block w-100" alt="Pokemon Banner 2" />
              <div className="carousel-caption" data-aos="fade-up">
                <h2 className="pokemon-font">Bayas y Objetos</h2>
                <p>Conoce todos los items disponibles en el juego</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://placehold.co/1920x500/FFDE00/000000/png?text=Movimientos+y+Estrategias" className="d-block w-100" alt="Pokemon Banner 3" />
              <div className="carousel-caption" data-aos="fade-up">
                <h2 className="pokemon-font">Movimientos y Estrategias</h2>
                <p>Aprende sobre los diferentes movimientos y sus efectos</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* Featured Pokemon Section */}
      <section className="container mt-5" data-aos="fade-up">
        <h2 className="pokemon-font text-center mb-4">Pokémon Destacados</h2>
        <div id="featured-pokemon" className="row"></div>
      </section>

      {/* Quick Access Cards */}
      <section className="container mt-5">
        <div className="row g-4">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div className="card h-100 hover-card">
              <div className="card-body text-center">
                <Icon sx={{ fontSize: 48 }}>catching_pokemon</Icon>
                <h3 className="pokemon-font mt-3">Pokédex</h3>
                <p>Explora la base de datos completa de Pokémon</p>
                <Link to="/pokedex" className="btn btn-primary">Ver Pokédex</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 hover-card">
              <div className="card-body text-center">
                <Icon sx={{ fontSize: 48 }}>eco</Icon>
                <h3 className="pokemon-font mt-3">Bayas</h3>
                <p>Descubre todas las bayas y sus efectos</p>
                <Link to="/berries" className="btn btn-primary">Ver Bayas</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="card h-100 hover-card">
              <div className="card-body text-center">
                <Icon sx={{ fontSize: 48 }}>place</Icon>
                <h3 className="pokemon-font mt-3">Ubicaciones</h3>
                <p>Explora las diferentes regiones y lugares</p>
                <Link to="/locations" className="btn btn-primary">Ver Ubicaciones</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-light py-5 mt-5" data-aos="fade-up">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="pokemon-font">898</h3>
                <p>Pokémon</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="pokemon-font">64</h3>
                <p>Bayas</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="pokemon-font">937</h3>
                <p>Movimientos</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="pokemon-font">18</h3>
                <p>Tipos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="container mt-5">
        <h2 className="pokemon-font text-center mb-4" data-aos="fade-up">Últimas Novedades</h2>
        <div className="row">
          <div className="col-md-6" data-aos="fade-right">
            <div className="card mb-4">
              <img src="https://placehold.co/800x400/FF0000/FFFFFF/png?text=Nuevas+Funcionalidades" className="card-img-top" alt="Pokemon News" />
              <div className="card-body">
                <h5 className="card-title pokemon-font">Nuevas Funcionalidades</h5>
                <p className="card-text">Explora las nuevas características de nuestra Pokédex</p>
                <span className="badge bg-primary">Nuevo</span>
                <span className="badge bg-secondary">Pokédex</span>
              </div>
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-left">
            <div className="card mb-4">
              <img src="https://placehold.co/800x400/3B4CCA/FFFFFF/png?text=Guia+de+Bayas" className="card-img-top" alt="Pokemon News" />
              <div className="card-body">
                <h5 className="card-title pokemon-font">Guía de Bayas</h5>
                <p className="card-text">Aprende a utilizar las bayas de manera efectiva</p>
                <span className="badge bg-primary">Guía</span>
                <span className="badge bg-secondary">Bayas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
