import React, { useState, useEffect } from 'react';
import { Icon } from '@mui/material';
import RegionList from './Locations/RegionList';
import LocationDetails from './Locations/LocationDetails';
import RegionMap from './Locations/RegionMap';
import { getRegions } from '../services/LocationService';

function Locations() {
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadRegions();
    }, []);

    const loadRegions = async () => {
        setLoading(true);
        try {
            const regionsData = await getRegions();
            setRegions(regionsData);
        } catch (error) {
            console.error('Error loading regions:', error);
        }
        setLoading(false);
    };

    return (
        <>
            <section className="location-hero text-center py-5">
                <div className="container">
                    <h1 className="pokemon-font" data-aos="fade-down">Regiones Pokémon</h1>
                    <p className="lead" data-aos="fade-up">Explora las diferentes regiones del mundo Pokémon</p>
                </div>
            </section>

            <main className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card region-card" data-aos="fade-right">
                            <div className="card-header pokemon-font bg-primary text-white">
                                <Icon className="align-middle me-2">public</Icon>
                                Regiones
                            </div>
                            <RegionList
                                regions={regions}
                                selectedRegion={selectedRegion}
                                onRegionSelect={setSelectedRegion}
                                loading={loading}
                            />
                        </div>
                    </div>

                    <div className="col-md-9">
                        <LocationDetails
                            region={selectedRegion}
                            loading={loading}
                        />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <RegionMap region={selectedRegion} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Locations;
