import React from 'react';
import { Icon } from '@mui/material';
import { getCategoryIcon } from '../../services/MoveService';

function MoveCard({ move }) {
    return (
        <div className="col-md-6" data-aos="fade-up">
            <div className="card move-card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="pokemon-font">{move.name.toUpperCase()}</span>
                    <span className={`badge type-badge type-${move.type.name}`}>
                        {move.type.name}
                    </span>
                </div>
                <div className="card-body">
                    <div className="move-stats">
                        <div className="stat-row">
                            <span className="stat-label">Potencia:</span>
                            <span className="stat-value">{move.power || 'N/A'}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Precisión:</span>
                            <span className="stat-value">{move.accuracy || 'N/A'}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">PP:</span>
                            <span className="stat-value">{move.pp}</span>
                        </div>
                    </div>
                    <div className="move-category mt-3">
                        <span className={`category-badge ${move.damage_class.name}`}>
                            <Icon className="category-icon">
                                {getCategoryIcon(move.damage_class.name)}
                            </Icon>
                            {move.damage_class.name}
                        </span>
                    </div>
                    <p className="move-description mt-3">
                        {move.effect_entries[0]?.short_effect || 'No description available'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MoveCard;
