import React from 'react';
import { POKEMON_TYPES } from '../../services/PokedexService';

function TypeFilters({ selectedTypes, onTypeToggle }) {
    return (
        <div className="type-filters-container">
            {POKEMON_TYPES.map(type => (
                <button
                    key={type}
                    className={`btn btn-sm type-filter type-${type} ${
                        selectedTypes.includes(type) ? 'active' : ''
                    }`}
                    onClick={() => onTypeToggle(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}

export default TypeFilters;
