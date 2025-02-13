import React from 'react';

function RegionList({ regions, selectedRegion, onRegionSelect, loading }) {
    return (
        <div className="card-body p-0">
            <div className="list-group list-group-flush">
                {loading ? (
                    <div className="text-center p-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    regions.map(region => (
                        <button
                            key={region.name}
                            className={`list-group-item list-group-item-action ${
                                selectedRegion?.name === region.name ? 'active' : ''
                            }`}
                            onClick={() => onRegionSelect(region)}
                        >
                            {region.name.toUpperCase()}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}

export default RegionList;
