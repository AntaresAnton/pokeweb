import React, { useState, useEffect } from 'react';
import { Icon } from '@mui/material';

function Pokedex() {
  return (
    <main className="container mt-4">
      <h1 className="pokemon-font text-center mb-4" data-aos="fade-down">Pokédex Nacional</h1>
      
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="search-wrapper" data-aos="fade-up">
            <div className="input-group">
              <input 
                type="text" 
                id="pokemon-search" 
                className="form-control form-control-lg" 
                placeholder="Buscar Pokémon por nombre o número..."
              />
              <button className="btn btn-primary btn-lg" type="button" id="search-btn">
                <Icon>search</Icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3" data-aos="fade-right">
          <div className="card filter-card mb-4">
            <div className="card-header pokemon-font bg-primary text-white">
              <Icon>filter_alt</Icon> Filtros
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h6 className="pokemon-font">Tipos</h6>
                <div id="type-filters" className="d-flex flex-wrap gap-2">
                  {/* Types will be inserted here via JavaScript */}
                </div>
              </div>
              
              <div className="mb-4">
                <h6 className="pokemon-font">Generación</h6>
                <select className="form-select" id="generation-filter">
                  <option value="">Todas las generaciones</option>
                  <option value="1">Generación I</option>
                  <option value="2">Generación II</option>
                  <option value="3">Generación III</option>
                  <option value="4">Generación IV</option>
                  <option value="5">Generación V</option>
                  <option value="6">Generación VI</option>
                  <option value="7">Generación VII</option>
                  <option value="8">Generación VIII</option>
                </select>
              </div>

              <div className="mb-4">
                <h6 className="pokemon-font">Ordenar por</h6>
                <select className="form-select" id="sort-filter">
                  <option value="id">Número</option>
                  <option value="name">Nombre</option>
                  <option value="weight">Peso</option>
                  <option value="height">Altura</option>
                </select>
              </div>

              <button className="btn btn-primary w-100" id="apply-filters">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
        
        {/* Pokemon Grid */}
        <div className="col-md-9">
          <div id="pokemon-grid" className="row g-4" data-aos="fade-up">
            {/* Pokemon cards will be inserted here */}
          </div>
          <div className="text-center mt-4" data-aos="fade-up">
            <button id="load-more" className="btn btn-lg btn-primary">
              <Icon>add</Icon> Cargar más Pokémon
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pokedex;
