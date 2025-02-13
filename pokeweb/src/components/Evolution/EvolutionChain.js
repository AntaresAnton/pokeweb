import React from 'react';
import { Icon } from '@mui/material';

function EvolutionChain({ evolutionData }) {
    if (!evolutionData) return null;

    return (
        <div className="evolution-tree bg-light rounded-4 shadow-sm p-4 mb-4">
            <div className="evolution-stage">
                <div className="card evolution-card rounded-4 shadow-sm">
                    <img 
                        src={evolutionData.sprites?.other['official-artwork'].front_default}
                        className="card-img-top pokemon-sprite p-2"
                        alt={evolutionData.species.name}
                        onError={(e) => {
                            e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionData.id}.png`
                        }}
                    />
                    <div className="card-body text-center p-2">
                        <h6 className="card-title pokemon-font mb-1 small">
                            {evolutionData.species.name.toUpperCase()}
                        </h6>
                        <div className="pokemon-types">
                            {evolutionData.types?.map((type, index) => (
                                <span 
                                    key={index} 
                                    className={`type-badge bg-${type.type.name} rounded-pill px-2 py-1 me-1`}
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {evolutionData.evolves_to?.length > 0 && (
                <>
                    <div className="evolution-arrow">
                        <Icon className="text-primary">arrow_forward</Icon>
                    </div>
                    {evolutionData.evolves_to.map((evolution, index) => (
                        <EvolutionChain key={index} evolutionData={evolution} />
                    ))}
                </>
            )}
        </div>
    );
}

export default EvolutionChain;
