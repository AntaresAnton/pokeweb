import React from 'react';

function MoveFilters({ types, filters, onFilterChange }) {
    return (
        <div className="filters-container mb-4">
            <select 
                className="form-select mb-3"
                value={filters.type}
                onChange={(e) => onFilterChange('type', e.target.value)}
            >
                <option value="">Todos los tipos</option>
                {types.map(type => (
                    <option key={type.name} value={type.name}>
                        {type.displayName}
                    </option>
                ))}
            </select>

            <div className="category-filters mb-3">
                {['physical', 'special', 'status'].map(category => (
                    <div key={category} className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="category"
                            value={category}
                            checked={filters.category === category}
                            onChange={(e) => onFilterChange('category', e.target.value)}
                        />
                        <label className="form-check-label">{category}</label>
                    </div>
                ))}
            </div>

            <div className="power-filter">
                <label>Potencia mínima: <span id="power-value">{filters.power}</span></label>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="250"
                    value={filters.power}
                    onChange={(e) => onFilterChange('power', parseInt(e.target.value))}
                />
            </div>
        </div>
    );
}

export default MoveFilters;
