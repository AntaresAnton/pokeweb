import { fetchData } from './api';

const LIMIT = 20;

export const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export async function getPokemon(offset = 0, filters = {}) {
    const response = await fetchData(`/pokemon?offset=${offset}&limit=${LIMIT}`);
    const pokemonDetails = await Promise.all(
        response.results.map(pokemon => fetchData(`/pokemon/${pokemon.name}`))
    );

    return pokemonDetails.filter(pokemon => {
        if (filters.types?.length > 0) {
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            return filters.types.some(type => pokemonTypes.includes(type));
        }
        return true;
    });
}

export async function searchPokemon(query) {
    if (!query) return null;
    return await fetchData(`/pokemon/${query.toLowerCase()}`);
}
