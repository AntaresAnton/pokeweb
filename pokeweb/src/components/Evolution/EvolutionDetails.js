import React from 'react';
import { Icon } from '@mui/material';

function EvolutionDetails({ details }) {
    return (
        <div className="evolution-requirements bg-white rounded-4 shadow-sm p-4">
            <div className="d-flex align-items-center mb-4">
                <Icon className="text-primary me-2">auto_awesome</Icon>
                <h5 className="pokemon-font mb-0">Requisitos de Evolución</h5>
            </div>
            <div className="evolution-details-grid">
                {details.map((detail, index) => (
                    <div key={index} className="evolution-detail">
                        <div className="from-to">
                            <span className="pokemon-font">{detail.from}</span>
                            <Icon>arrow_forward</Icon>
                            <span className="pokemon-font">{detail.to}</span>
                        </div>
                        <div className="requirements">
                            <span className="badge bg-info">{detail.requirement}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EvolutionDetails;
