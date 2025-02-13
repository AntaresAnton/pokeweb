import React, { useState, useEffect } from 'react';
import { getLocationDetails } from '../../services/LocationService';

function PokemonEncounters({ region }) {
    const [encounters, setEncounters] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (region) {
            loadEncounters();
        }
    }, [region]);

    const loadEncounters = async () => {
        setLoading(true);
        try {
            const data = await getLocationDetails(region.name);
            setEncounters(data || []);
        } catch (error) {
            console.error('Error loading encounters:', error);
            setEncounters([]);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!encounters || encounters.length === 0) {
        return (
            <div className="text-center mt-4">
                <p>No hay encuentros disponibles para esta región.</p>
            </div>
        );
    }

    return (
        <div className="pokemon-encounters mt-4">
            <h4 className="pokemon-font mb-3">Encuentros Pokémon</h4>
            <div className="row">
                {encounters.map((encounter, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{encounter.pokemon.name}</h5>
                                <p className="card-text">
                                    Nivel: {encounter.min_level} - {encounter.max_level}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonEncounters;
