import React from 'react';
import { Icon } from '@mui/material';

function RegionMap({ region }) {
    return (
        <div className="card map-card" data-aos="fade-up">
            <div className="card-header pokemon-font bg-info text-white">
                <Icon className="align-middle me-2">map</Icon>
                Mapa de la Región
            </div>
            <div className="card-body">
                <div className="text-center">
                    <img
                        src={region?.mapUrl || "https://placehold.co/1200x600/3B4CCA/FFFFFF/png?text=Mapa+de+la+Region"}
                        className="img-fluid rounded"
                        alt={`Mapa de ${region?.name || 'la región'}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default RegionMap;
