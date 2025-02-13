export function createPokemonCard(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name.toUpperCase(),
        image: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map(type => ({
            name: type.type.name,
            className: `type-badge bg-${type.type.name}`
        }))
    };
}

export function createBerryCard(berry) {
    return {
        name: berry.name.toUpperCase(),
        growthTime: berry.growth_time,
        maxHarvest: berry.max_harvest
    };
}

export function createMoveCard(move) {
    return {
        name: move.name.toUpperCase(),
        type: move.type.name,
        power: move.power || 'N/A',
        accuracy: move.accuracy || 'N/A',
        pp: move.pp
    };
}
