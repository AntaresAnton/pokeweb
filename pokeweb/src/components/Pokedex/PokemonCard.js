import React from 'react';

function PokemonCard({ pokemon }) {
    return (
        <div className="col-md-4 mb-4" data-aos="fade-up">
            <div className="card pokemon-card">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    className="card-img-top pokemon-sprite"
                    alt={pokemon.name}
                />
                <div className="card-body text-center">
                    <h5 className="card-title pokemon-font">
                        {pokemon.name.toUpperCase()}
                    </h5>
                    <div className="pokemon-types">
                        {pokemon.types.map((type, index) => (
                            <span
                                key={index}
                                className={`type-badge type-${type.type.name}`}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
