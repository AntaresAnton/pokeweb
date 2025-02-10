// Initialize locations
async function initLocations() {
    await loadRegions();
    setupEventListeners();
}

// Load all regions
async function loadRegions() {
    const regionList = document.getElementById('region-list');
    try {
        const regions = await fetchData('/region');
        regionList.innerHTML = regions.results.map(region => `
            <button class="list-group-item list-group-item-action d-flex align-items-center" 
                    onclick="showRegionDetails('${region.name}')">
                <i class="material-icons me-2">place</i>
                ${region.name.toUpperCase()}
            </button>
        `).join('');
    } catch (error) {
        console.error('Error loading regions:', error);
        regionList.innerHTML = '<div class="text-center p-3">Error loading regions</div>';
    }
}


// Show location details
async function showLocationDetails(locationName) {
    const pokemonEncounters = document.getElementById('pokemon-encounters');
    try {
        const locationData = await fetchData(`/location/${locationName}`);
        const areas = await Promise.all(
            locationData.areas.map(area => fetchData(area.url))
        );

        const encounters = areas.flatMap(area => area.pokemon_encounters);
        
        pokemonEncounters.innerHTML = `
            <h5 class="pokemon-font mb-3">Pokémon Encontrados:</h5>
            <div class="row g-3">
                ${encounters.map(encounter => `
                    <div class="col-md-3">
                        <div class="pokemon-encounter-card text-center p-2">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(encounter.pokemon.url)}.png" 
                                 alt="${encounter.pokemon.name}"
                                 class="encounter-sprite">
                            <p class="pokemon-font small mb-0">${encounter.pokemon.name.toUpperCase()}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading location details:', error);
        pokemonEncounters.innerHTML = '<div class="text-center">Error loading Pokémon encounters</div>';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initLocations);
