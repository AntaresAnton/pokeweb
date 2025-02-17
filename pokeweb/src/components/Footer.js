import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';

function Footer() {
  return (
    <footer className="footer mt-5 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="pokemon-font text-primary">PokéWeb</h5>
            <p>Tu fuente definitiva de información Pokémon. Explora, aprende y conviértete en el mejor entrenador.</p>
            <div className="social-icons">
              <a href="#" className="me-3"><Icon>facebook</Icon></a>
              <a href="#" className="me-3"><Icon>twitter</Icon></a>
              <a href="#"><Icon>instagram</Icon></a>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="pokemon-font text-primary">Enlaces Rápidos</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/pokedex">Pokédex</Link></li>
              <li><Link to="/berries">Bayas</Link></li>
              <li><Link to="/locations">Ubicaciones</Link></li>
              <li><Link to="/moves">Movimientos</Link></li>
              
            </ul>
            <a href="/social-media-link" className="social-link">...</a>
<a href="/terms" className="footer-link">...</a>
<a href="/privacy" className="footer-link">...</a>

          </div>
          <div className="col-md-4">
            <h5 className="pokemon-font text-primary">Tipos Pokémon</h5>
            <div className="type-badges">
              <span className="type-badge bg-fire">Fuego</span>
              <span className="type-badge bg-water">Agua</span>
              <span className="type-badge bg-grass">Planta</span>
              <span className="type-badge bg-electric">Eléctrico</span>
              <span className="type-badge bg-psychic">Psíquico</span>
              <span className="type-badge bg-dragon">Dragón</span>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">© {new Date().getFullYear()} PokéWeb. Powered by <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokeAPI</a></p>
          </div>
          <div className="col-md-6 text-md-end">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu" className="footer-sprite" />
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" className="footer-sprite" />
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" className="footer-sprite" />
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" className="footer-sprite" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
