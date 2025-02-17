import { fetchData } from './api';

export async function getPokemonList() {
    const response = await fetchData('/pokemon?limit=898');
    return response.results.map((pokemon, index) => ({
        id: String(index + 1).padStart(3, '0'),
        name: pokemon.name.toUpperCase(),
        value: pokemon.name
    }));
}

export async function getEvolutionChainData(pokemonName) {
    const species = await fetchData(`/pokemon-species/${pokemonName}`);
    if (!species || !species.evolution_chain) {
        throw new Error('Evolution chain not found');
    }

    const chainId = species.evolution_chain.url.split('/').filter(Boolean).pop();
    const evolutionChain = await fetchData(`/evolution-chain/${chainId}`);
    
    // Añadir datos de Pokémon a cada nodo de la cadena
    const enrichedChain = await enrichChainWithPokemonData(evolutionChain.chain);
    
    return { ...evolutionChain, chain: enrichedChain };
}

async function enrichChainWithPokemonData(chain) {
    const pokemon = await fetchData(`/pokemon/${chain.species.name}`);
    const enrichedNode = {
        ...chain,
        id: pokemon.id,
        sprites: pokemon.sprites,
        types: pokemon.types
    };

    if (chain.evolves_to?.length > 0) {
        enrichedNode.evolves_to = await Promise.all(
            chain.evolves_to.map(evolution => enrichChainWithPokemonData(evolution))
        );
    }

    return enrichedNode;
}


export async function getPokemonEvolutionData(chainNode) {
    const pokemon = await fetchData(`/pokemon/${chainNode.species.name}`);
    return {
        name: pokemon.name.toUpperCase(),
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        
        fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        types: pokemon.types.map(type => ({
            name: type.type.name,
            className: `type-badge bg-${type.type.name} rounded-pill px-2 py-1 me-1`
        }))
    };
}


export function formatEvolutionDetails(chain) {
    const details = [];
    
    if (chain.evolves_to?.length > 0) {
        chain.evolves_to.forEach(evolution => {
            const trigger = evolution.evolution_details[0];
            details.push({
                from: chain.species.name.toUpperCase(),
                to: evolution.species.name.toUpperCase(),
                requirement: formatEvolutionTrigger(trigger)
            });
            
            details.push(...formatEvolutionDetails(evolution));
        });
    }
    
    return details;
}

function formatEvolutionTrigger(trigger) {
    if (!trigger) return 'No evolution details available';
    
    switch (trigger.trigger.name) {
        case 'level-up':
            return trigger.min_level ? `Nivel ${trigger.min_level}` : 'Subir de nivel';
        case 'use-item':
            return `Usar ${trigger.item.name}`;
        case 'trade':
            return 'Intercambio';
        default:
            return trigger.trigger.name;
    }
}
