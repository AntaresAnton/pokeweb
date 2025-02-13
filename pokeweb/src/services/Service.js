import { fetchData } from './api';

export async function getFeaturedPokemon() {
    const randomIds = Array.from({length: 9}, () => Math.floor(Math.random() * 898) + 1);
    return Promise.all(randomIds.map(id => fetchData(`/pokemon/${id}`)));
}

export async function getPokedexPokemon(offset = 0, limit = 20) {
    const pokemons = await fetchData(`/pokemon?offset=${offset}&limit=${limit}`);
    return Promise.all(pokemons.results.map(pokemon => fetchData(`/pokemon/${pokemon.name}`)));
}
