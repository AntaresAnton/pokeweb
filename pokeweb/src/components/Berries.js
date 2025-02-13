import React, { useState, useEffect } from 'react';
import { Icon } from '@mui/material';
import BerriesGrid from './Berries/BerriesGrid';
import BerryFilters from './Berries/BerryFilters';
import { getBerries } from '../services/BerryService';
import BerryCard from './Berries/BerryCard';

function Berries() {
    const [berries, setBerries] = useState([]);
    const [filters, setFilters] = useState({
        firmness: '',
        flavors: []
    });
    const [loading, setLoading] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(0);

    useEffect(() => {
        loadBerries(0);
    }, [filters]);

    const loadBerries = async (offset = 0) => {
        setLoading(true);
        try {
            const berriesData = await getBerries(offset, filters);
            setBerries(offset === 0 ? berriesData : [...berries, ...berriesData]);
            setCurrentOffset(offset);
        } catch (error) {
            console.error('Error loading berries:', error);
        }
        setLoading(false);
    };

    const handleLoadMore = () => {
        const newOffset = currentOffset + 20;
        loadBerries(newOffset);
    };

    return (
        <>
            <section className="berry-hero text-center py-5 mb-4">
                <div className="container">
                    <h1 className="pokemon-font" data-aos="fade-down">Bayas Pokémon</h1>
                    <p className="lead" data-aos="fade-up">
                        Descubre todas las bayas y sus efectos en el mundo Pokémon
                    </p>
                </div>
            </section>

            <main className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card filter-card mb-4" data-aos="fade-right">
                            <div className="card-header pokemon-font bg-success text-white">
                                <Icon className="align-middle me-2">filter_alt</Icon>
                                Filtros
                            </div>
                            <BerryFilters
                                filters={filters}
                                onFilterChange={setFilters}
                            />
                        </div>

                        <div className="card mb-4" data-aos="fade-right" data-aos-delay="100">
                            <div className="card-header pokemon-font bg-info text-white">
                                <Icon className="align-middle me-2">help_outline</Icon>
                                Guía Rápida
                            </div>
                            <div className="card-body">
                                <p className="small">
                                    Las bayas son objetos que pueden ser plantados y cosechados.
                                    Cada baya tiene efectos únicos cuando se usa en batalla o se procesa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <BerriesGrid
                            berries={berries}
                            loading={loading}
                            onLoadMore={handleLoadMore}
                            BerryCard={BerryCard}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Berries;
