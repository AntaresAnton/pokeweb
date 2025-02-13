import React, { useState, useEffect } from 'react';
import { getPokemon, searchPokemon } from '../services/PokedexService';
import TypeFilters from './Pokedex/TypeFilters';
import PokemonCard from './Pokedex/PokemonCard';

function Pokedex() {
    const [pokemon, setPokemon] = useState([]);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [filters, setFilters] = useState({
        types: [],
        generation: '',
        sort: 'id'
    });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPokemon();
    }, []);

    const loadPokemon = async (offset = 0) => {
        setLoading(true);
        try {
            const pokemonData = await getPokemon(offset, filters);
            setPokemon(offset === 0 ? pokemonData : [...pokemon, ...pokemonData]);
        } catch (error) {
            console.error('Error loading Pokemon:', error);
        }
        setLoading(false);
    };

    const handleTypeToggle = (type) => {
        setFilters(prev => {
            const types = prev.types.includes(type)
                ? prev.types.filter(t => t !== type)
                : [...prev.types, type];
            return { ...prev, types };
        });
        resetAndReload();
    };

    const handleGenerationChange = (generation) => {
        setFilters(prev => ({ ...prev, generation }));
        resetAndReload();
    };

    const handleSortChange = (sort) => {
        setFilters(prev => ({ ...prev, sort }));
        resetAndReload();
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            loadPokemon(0);
            return;
        }
        try {
            const result = await searchPokemon(searchQuery);
            if (result) {
                setPokemon([result]);
            }
        } catch (error) {
            console.error('Pokemon not found:', error);
        }
    };

    const resetAndReload = () => {
        setCurrentOffset(0);
        loadPokemon(0);
    };

    const handleLoadMore = () => {
        const newOffset = currentOffset + 20;
        setCurrentOffset(newOffset);
        loadPokemon(newOffset);
    };

    return (
        <main className="container mt-4">
            <h1 className="pokemon-font text-center mb-4" data-aos="fade-down">
                Pokédex
            </h1>

            <div className="row mb-4">
                <div className="col-md-8 mx-auto">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar Pokémon..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="filters-section mb-4">
                <TypeFilters
                    selectedTypes={filters.types}
                    onTypeToggle={handleTypeToggle}
                />

                <div className="row mt-3">
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={filters.generation}
                            onChange={(e) => handleGenerationChange(e.target.value)}
                        >
                            <option value="">Todas las generaciones</option>
                            {/* Add generation options */}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={filters.sort}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="id">Ordenar por ID</option>
                            <option value="name">Ordenar por Nombre</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row" id="pokemon-grid">
                {pokemon.map((p, index) => (
                    <PokemonCard key={index} pokemon={p} />
                ))}
            </div>

            {!searchQuery && (
                <button
                    className="btn btn-primary d-block mx-auto mt-4"
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Cargar más'}
                </button>
            )}
        </main>
    );
}

export default Pokedex;
