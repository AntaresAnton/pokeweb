import React, { useState, useEffect } from 'react';
import { getPokemonList, getEvolutionChainData } from '../services/EvolutionService';
import EvolutionChain from './Evolution/EvolutionChain';
import EvolutionDetails from './Evolution/EvolutionDetails';

function Evolution() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [evolutionData, setEvolutionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPokemonList = async () => {
      const list = await getPokemonList();
      setPokemonList(list);
    };
    loadPokemonList();
  }, []);

  const handlePokemonSelect = async (event) => {
    const pokemonName = event.target.value;
    setSelectedPokemon(pokemonName);
    
    if (pokemonName) {
      try {
        const chainData = await getEvolutionChainData(pokemonName);
        setEvolutionData(chainData);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar la cadena evolutiva');
        setEvolutionData(null);
      }
    }
  };

  return (
    <main className="container mt-4">
      <h1 className="pokemon-font text-center mb-4" data-aos="fade-down">
        Evoluciones Pokémon
      </h1>

      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <div className="form-group">
            <input
              list="pokemon-list"
              id="pokemon-select"
              className="form-control form-control-lg"
              placeholder="Selecciona un Pokémon..."
              value={selectedPokemon}
              onChange={handlePokemonSelect}
            />
            <datalist id="pokemon-list">
              {pokemonList.map(pokemon => (
                <option 
                  key={pokemon.id} 
                  value={pokemon.value}
                >
                  {`${pokemon.id} - ${pokemon.name}`}
                </option>
              ))}
            </datalist>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger rounded-4 shadow-sm">
          <div className="d-flex align-items-center">
            <i className="material-icons me-2">error_outline</i>
            <span>{error}</span>
          </div>
        </div>
      )}

      {evolutionData && (
        <div className="row">
          <div className="col-12 mb-4">
            <EvolutionChain evolutionData={evolutionData.chain} />
          </div>
          <div className="col-12">
            <EvolutionDetails details={evolutionData.chain} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Evolution;
