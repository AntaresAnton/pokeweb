import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu Logo"
            className="nav-logo me-2"
          />
          <span className="pokemon-font">PokéWeb</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/pokedex">
                <i className="material-icons nav-icon">catching_pokemon</i>
                Pokédex
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/evolution">
                <i className="material-icons nav-icon">upgrade</i>
                Evoluciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/items">
                <i className="material-icons nav-icon">backpack</i>
                Objetos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/berries">
                <i className="material-icons nav-icon">eco</i>
                Bayas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/locations">
                <i className="material-icons nav-icon">place</i>
                Ubicaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/moves">
                <i className="material-icons nav-icon">flash_on</i>
                Movimientos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
