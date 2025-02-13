import React from 'react';
import { Icon } from '@mui/material';
import PokemonEncounters from './PokemonEncounters';

function LocationDetails({ region, loading }) {
    if (loading) {
        return (
            <div className="card" data-aos="fade-left">
                <div className="card-body text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!region) {
        return (
            <div className="card" data-aos="fade-left">
                <div className="card-body">
                    <div className="text-center initial-message">
                        <Icon className="md-48">travel_explore</Icon>
                        <h3 className="pokemon-font mt-3">Selecciona una región</h3>
                        <p>Descubre las ubicaciones y los Pokémon que habitan en ella</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card" data-aos="fade-left">
            <div className="card-body">
                <div id="location-info">
                    <h2 className="pokemon-font">{region.name.toUpperCase()}</h2>
                    {/* Add region details here */}
                </div>
                <PokemonEncounters region={region} />
            </div>
        </div>
    );
}

export default LocationDetails;
