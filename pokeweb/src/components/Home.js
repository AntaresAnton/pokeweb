import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPokemon } from '../services/Service';
import { usePokeData } from '../hooks/usePokeData';

function Home() {
    const { data: featuredPokemon, loading } = usePokeData(getFeaturedPokemon);

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
                <img src="https://placehold.co/1920x600/FF0000/FF0000/png" className="d-block w-100" alt="Pokemon Banner 1" />
                <div className="carousel-content position-absolute start-50 translate-middle-x" data-aos="fade-right">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-start text-white">
                                <h2 className="pokemon-font display-4">Explora el Mundo Pokémon</h2>
                                <p className="lead">Descubre información detallada sobre tus Pokémon favoritos</p>
                                <Link to="/pokedex" className="btn btn-light btn-lg mt-3">Explorar Pokédex</Link>
                            </div>
                            <div className="col-md-6">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                                     alt="Pikachu" 
                                     className="img-fluid pokemon-hero-image" 
                                     style={{maxHeight: '400px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <img src="https://placehold.co/1920x600/3B4CCA/3B4CCA/png?text=Bayas+y+Objetos" className="d-block w-100" alt="Pokemon Banner 2" />
                <div className="carousel-content position-absolute start-50 translate-middle-x" data-aos="fade-left">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" 
                                     alt="Bulbasaur" 
                                     className="img-fluid pokemon-hero-image" 
                                     style={{maxHeight: '400px'}}/>
                            </div>
                            <div className="col-md-6 text-end text-white">
                                <h2 className="pokemon-font display-4">Bayas y Objetos</h2>
                                <p className="lead">Conoce todos los items disponibles en el juego</p>
                                <Link to="/berries" className="btn btn-light btn-lg mt-3">Ver Bayas</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <img src="https://placehold.co/1920x600/FFDE00/FFDE00/png?text=Movimientos+y+Estrategias" className="d-block w-100" alt="Pokemon Banner 3" />
                <div className="carousel-content position-absolute start-50 translate-middle-x" data-aos="fade-right">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-start">
                                <h2 className="pokemon-font display-4">Movimientos y Estrategias</h2>
                                <p className="lead">Aprende sobre los diferentes movimientos y sus efectos</p>
                                <Link to="/moves" className="btn btn-dark btn-lg mt-3">Ver Movimientos</Link>
                            </div>
                            <div className="col-md-6">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" 
                                     alt="Charizard" 
                                     className="img-fluid pokemon-hero-image" 
                                     style={{maxHeight: '400px'}}/>
                            </div>
                        </div>
                    </div>
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
    <div className="row">
        {loading ? (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : (
            featuredPokemon?.map((pokemon, index) => (
                <div key={pokemon.id} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="card pokemon-card h-100">
                        <div className="card-header bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="pokemon-id">#{pokemon.id}</span>
                                <div className="pokemon-types">
                                    {pokemon.types.map(type => (
                                        <span key={type.type.name} className={`badge bg-${type.type.name} me-1`}>
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <div className="pokemon-image-container">
                                <img 
                                    src={pokemon.sprites.front_default} 
                                    className="pokemon-sprite" 
                                    alt={pokemon.name}
                                    style={{width: '120px', height: '120px'}}
                                />
                            </div>
                            <h5 className="pokemon-font mt-2">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                            <div className="stats-container mt-3">
                                <div className="row g-2">
                                    <div className="col-6">
                                        <div className="stat-badge">
                                            <small>HP</small>
                                            <div className="stat-value">{pokemon.stats[0].base_stat}</div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="stat-badge">
                                            <small>ATK</small>
                                            <div className="stat-value">{pokemon.stats[1].base_stat}</div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="stat-badge">
                                            <small>DEF</small>
                                            <div className="stat-value">{pokemon.stats[2].base_stat}</div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="stat-badge">
                                            <small>SPD</small>
                                            <div className="stat-value">{pokemon.stats[5].base_stat}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="abilities">
                                {pokemon.abilities.map((ability, idx) => (
                                    <span key={idx} className="badge bg-secondary me-1">
                                        {ability.ability.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
</section>


            {/* Quick Access Cards */}
<section className="container mt-5">
    <div className="row g-4">
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
            <div className="card h-100 hover-card pokedex-card">
                <div className="card-body text-center">
                    <img 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pokedex.png" 
                        alt="Pokédex" 
                        className="quick-access-icon mb-3"
                    />
                    <h3 className="pokemon-font mt-3 text-danger">Pokédex</h3>
                    <p className="text-dark">Explora la base de datos completa de Pokémon</p>
                    <Link to="/pokedex" className="btn btn-danger pokemon-btn">Ver Pokédex</Link>
                </div>
            </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 hover-card berries-card">
                <div className="card-body text-center">
                    <img 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png" 
                        alt="Bayas" 
                        className="quick-access-icon mb-3"
                    />
                    <h3 className="pokemon-font mt-3 text-success">Bayas</h3>
                    <p className="text-dark">Descubre todas las bayas y sus efectos</p>
                    <Link to="/berries" className="btn btn-success pokemon-btn">Ver Bayas</Link>
                </div>
            </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="card h-100 hover-card locations-card">
                <div className="card-body text-center">
                    <img 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/town-map.png" 
                        alt="Ubicaciones" 
                        className="quick-access-icon mb-3"
                    />
                    <h3 className="pokemon-font mt-3 text-primary">Ubicaciones</h3>
                    <p className="text-dark">Explora las diferentes regiones y lugares</p>
                    <Link to="/locations" className="btn btn-primary pokemon-btn">Ver Ubicaciones</Link>
                </div>
            </div>
        </div>
    </div>
</section>


           {/* Stats Section */}
<section className="stats-section py-5 mt-5" data-aos="fade-up">
    <div className="container">
        <div className="row text-center g-4">
            <div className="col-md-3">
                <div className="stat-card pokemon-stat">
                    <div className="stat-image">
                        <img 
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                            alt="Pikachu"
                            className="stat-pokemon-img"
                        />
                    </div>
                    <h3 className="pokemon-font stat-number">898</h3>
                    <p className="stat-label">Pokémon</p>
                    <div className="stat-progress">
                        <div className="progress">
                            <div className="progress-bar bg-danger" style={{width: '100%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card berry-stat">
                    <div className="stat-image">
                        <img 
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" 
                            alt="Bulbasaur"
                            className="stat-pokemon-img"
                        />
                    </div>
                    <h3 className="pokemon-font stat-number">64</h3>
                    <p className="stat-label">Bayas</p>
                    <div className="stat-progress">
                        <div className="progress">
                            <div className="progress-bar bg-success" style={{width: '75%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card moves-stat">
                    <div className="stat-image">
                        <img 
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" 
                            alt="Charizard"
                            className="stat-pokemon-img"
                        />
                    </div>
                    <h3 className="pokemon-font stat-number">937</h3>
                    <p className="stat-label">Movimientos</p>
                    <div className="stat-progress">
                        <div className="progress">
                            <div className="progress-bar bg-primary" style={{width: '90%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card types-stat">
                    <div className="stat-image">
                        <img 
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" 
                            alt="Mewtwo"
                            className="stat-pokemon-img"
                        />
                    </div>
                    <h3 className="pokemon-font stat-number">18</h3>
                    <p className="stat-label">Tipos</p>
                    <div className="stat-progress">
                        <div className="progress">
                            <div className="progress-bar bg-warning" style={{width: '60%'}}></div>
                        </div>
                    </div>
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
