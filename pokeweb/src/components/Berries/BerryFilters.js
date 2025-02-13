import React from 'react';

function BerryFilters({ filters, onFilterChange }) {
    const handleFirmnessChange = (firmness) => {
        onFilterChange({ ...filters, firmness });
    };

    const handleFlavorToggle = (flavor) => {
        const newFlavors = filters.flavors.includes(flavor)
            ? filters.flavors.filter(f => f !== flavor)
            : [...filters.flavors, flavor];
        onFilterChange({ ...filters, flavors: newFlavors });
    };

    return (
        <div className="card-body">
            <div className="mb-4">
                <h6 className="pokemon-font">Firmeza</h6>
                <select 
                    className="form-select" 
                    value={filters.firmness}
                    onChange={(e) => handleFirmnessChange(e.target.value)}
                >
                    <option value="">Todas las firmezas</option>
                    <option value="very-soft">Muy Suave</option>
                    <option value="soft">Suave</option>
                    <option value="hard">Dura</option>
                    <option value="very-hard">Muy Dura</option>
                    <option value="super-hard">Super Dura</option>
                </select>
            </div>

            <div className="mb-4">
                <h6 className="pokemon-font">Sabores</h6>
                <div className="flavor-filters">
                    {[
                        { value: 'spicy', label: 'Picante' },
                        { value: 'dry', label: 'Seco' },
                        { value: 'sweet', label: 'Dulce' },
                        { value: 'bitter', label: 'Amargo' },
                        { value: 'sour', label: 'Ácido' }
                    ].map(flavor => (
                        <div className="form-check" key={flavor.value}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`flavor-${flavor.value}`}
                                checked={filters.flavors.includes(flavor.value)}
                                onChange={() => handleFlavorToggle(flavor.value)}
                            />
                            <label className="form-check-label" htmlFor={`flavor-${flavor.value}`}>
                                <span className={`flavor-dot ${flavor.value}`}></span>
                                {flavor.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BerryFilters;
