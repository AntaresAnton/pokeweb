import React from 'react';
import { Icon } from '@mui/material';

function EvolutionDetails({ details }) {
    if (!details || !details.evolves_to) {
        return null;
    }

    const getEvolutionDetails = (chain) => {
        const details = [];
        
        if (chain.evolves_to?.length > 0) {
            chain.evolves_to.forEach(evolution => {
                const trigger = evolution.evolution_details[0];
                details.push({
                    from: chain.species.name.toUpperCase(),
                    to: evolution.species.name.toUpperCase(),
                    requirement: formatEvolutionTrigger(trigger)
                });
                
                details.push(...getEvolutionDetails(evolution));
            });
        }
        
        return details;
    };

    const formatEvolutionTrigger = (trigger) => {
        if (!trigger) return 'No evolution details available';
        
        switch (trigger.trigger.name) {
            case 'level-up':
                return trigger.min_level ? `Nivel ${trigger.min_level}` : 'Subir de nivel';
            case 'use-item':
                return `Usar ${trigger.item.name}`;
            case 'trade':
                return 'Intercambio';
            default:
                return trigger.trigger.name;
        }
    };

    const evolutionDetails = getEvolutionDetails(details);

    return (
        <div className="evolution-requirements bg-white rounded-4 shadow-sm p-4">
            <div className="d-flex align-items-center mb-4">
                <Icon className="text-primary me-2">auto_awesome</Icon>
                <h5 className="pokemon-font mb-0">Requisitos de Evolución</h5>
            </div>
            <div className="evolution-list">
                {evolutionDetails.map((detail, index) => (
                    <div key={index} className="evolution-requirement mb-3">
                        <div className="d-flex align-items-center">
                            <span className="pokemon-font me-2">{detail.from}</span>
                            <Icon className="text-primary mx-2">arrow_forward</Icon>
                            <span className="pokemon-font me-2">{detail.to}</span>
                            <span className="requirement-text ms-2">
                                ({detail.requirement})
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EvolutionDetails;
