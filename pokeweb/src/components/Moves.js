import React, { useState, useEffect } from 'react';
import { getMoveTypes, getMoves, searchMove } from '../services/MoveService';
import MoveCard from './Moves/MoveCard';
import MoveFilters from './Moves/MoveFilters';

function Moves() {
    const [moves, setMoves] = useState([]);
    const [types, setTypes] = useState([]);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        power: 0
    });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadMoveTypes();
        loadMoves();
    }, []);

    const loadMoveTypes = async () => {
        const typesData = await getMoveTypes();
        setTypes(typesData);
    };

    const loadMoves = async (offset = 0) => {
        setLoading(true);
        try {
            const movesData = await getMoves(offset, filters);
            setMoves(offset === 0 ? movesData : [...moves, ...movesData]);
        } catch (error) {
            console.error('Error loading moves:', error);
        }
        setLoading(false);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setCurrentOffset(0);
        loadMoves(0);
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            loadMoves(0);
            return;
        }
        try {
            const move = await searchMove(searchQuery);
            if (move) {
                setMoves([move]);
            }
        } catch (error) {
            console.error('Move not found:', error);
        }
    };

    const handleLoadMore = () => {
        const newOffset = currentOffset + 20;
        setCurrentOffset(newOffset);
        loadMoves(newOffset);
    };

    return (
        <main className="container mt-4">
            <h1 className="pokemon-font text-center mb-4" data-aos="fade-down">
                Movimientos Pokémon
            </h1>

            <div className="row">
                <div className="col-md-3">
                    <MoveFilters
                        types={types}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="col-md-9">
                    <div className="search-container mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar movimiento..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            className="btn btn-primary ms-2"
                            onClick={handleSearch}
                        >
                            Buscar
                        </button>
                    </div>

                    <div className="row" id="moves-grid">
                        {moves.map((move, index) => (
                            <MoveCard key={index} move={move} />
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
                </div>
            </div>
        </main>
    );
}

export default Moves;
