import React from 'react';
import { Icon } from '@mui/material';
import BerryCard from './BerryCard';

function BerriesGrid({ berries, loading, onLoadMore }) {
    return (
        <>
            <div className="row g-4" id="berries-grid">
                {berries.map((berry, index) => (
                    <div key={index} className="col-md-4" data-aos="fade-up">
                        <BerryCard berry={berry} />
                    </div>
                ))}
            </div>
            
            <div className="d-flex justify-content-center mt-4" data-aos="fade-up">
                <button 
                    className="btn btn-lg btn-success"
                    onClick={onLoadMore}
                    disabled={loading}
                >
                    <Icon>add</Icon> 
                    {loading ? 'Cargando...' : 'Cargar más Bayas'}
                </button>
            </div>
        </>
    );
}

export default BerriesGrid;
