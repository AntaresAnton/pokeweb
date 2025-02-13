import { fetchData, getPokemonId } from './api';

export async function getLocations() {
    return await fetchData('/region');
}

export async function getRegionDetails(regionName) {
    return await fetchData(`/region/${regionName}`);
}

export function formatLocationName(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


export async function getRegions() {
    const regions = await fetchData('/region');
    return regions.results.map(region => ({
        name: region.name,
        displayName: region.name.toUpperCase()
    }));
}

export async function getLocationDetails(locationName) {
    const locationData = await fetchData(`/location/${locationName}`);
    const areas = await Promise.all(
        locationData.areas.map(area => fetchData(area.url))
    );

    return areas.flatMap(area => area.pokemon_encounters.map(encounter => ({
        name: encounter.pokemon.name.toUpperCase(),
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(encounter.pokemon.url)}.png`
    })));
}
