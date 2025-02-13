import React from 'react';

function BerryCard({ berry }) {
    return (
        <div className="card berry-card h-100">
            <div className="card-header text-center">
                <img 
                    src={`/assets/images/berries/${berry.name}.png`}
                    className="berry-sprite"
                    alt={berry.name}
                    onError={(e) => {
                        e.target.src = '/assets/images/berry-placeholder.png';
                    }}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title pokemon-font text-center">
                    {berry.name.toUpperCase()}
                </h5>
                <div className="berry-details">
                    <div className="detail-row">
                        <span className="detail-label">Firmeza:</span>
                        <span className="detail-value">{berry.firmness.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Tiempo de crecimiento:</span>
                        <span className="detail-value">{berry.growth_time} horas</span>
                    </div>
                    <div className="flavors-container">
                        {berry.flavors.map((flavor, index) => (
                            <span 
                                key={index}
                                className={`flavor-badge ${flavor.flavor.name}`}
                                title={`${flavor.flavor.name}: ${flavor.potency}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BerryCard;
