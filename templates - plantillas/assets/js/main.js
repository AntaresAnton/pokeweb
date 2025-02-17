// Disable all console outputs
// comentarlo mientras esté en fase de pruebas

// window.console = {
//     log: () => {},
//     error: () => {},
//     warn: () => {},
//     info: () => {},
//     debug: () => {}
// };


// Helper function to get Pokemon ID from species URL
function getPokemonId(url) {
    return url.split('/').filter(Boolean).pop();
}

const BASE_URL = 'https://pokeapi.co/api/v2';

// Función base para peticiones
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


async function showFeaturedPokemon() {
    const featuredContainer = document.getElementById('featured-pokemon');
    if (!featuredContainer) return;

    const randomIds = Array.from({length: 9}, () => Math.floor(Math.random() * 898) + 1);
    
    const pokemonCards = await Promise.all(randomIds.map(async (id) => {
        const pokemon = await fetchData(`/pokemon/${id}`);
        const mainStat = pokemon.stats[0].base_stat;
        const attackStat = pokemon.stats[1].base_stat;
        
        return `
            <div class="col-md-4 mb-4">
                <div class="card featured-pokemon-card">
                    <div class="card-header">
                        <span class="pokemon-number">#${String(pokemon.id).padStart(3, '0')}</span>
                    </div>
                    <div class="pokemon-image-container">
                        <img src="${pokemon.sprites.other['official-artwork'].front_default}"
                             class="card-img-top align-items pokemon-sprite"
                             alt="${pokemon.name}">
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title pokemon-font mb-3">${pokemon.name.toUpperCase()}</h5>
                        <div class="pokemon-types">
                            ${pokemon.types.map(type =>
                                `<span class="type-badge type-${type.type.name}">
                                    ${type.type.name}
                                </span>`
                            ).join('')}
                        </div>
                        <div class="pokemon-stats mt-3">
                            <div class="stat">
                                <small>HP: ${mainStat}</small>
                                <div class="progress">
                                    <div class="progress-bar bg-success" 
                                         style="width: ${(mainStat / 255) * 100}%">
                                    </div>
                                </div>
                            </div>
                            <div class="stat">
                                <small>ATK: ${attackStat}</small>
                                <div class="progress">
                                    <div class="progress-bar bg-danger" 
                                         style="width: ${(attackStat / 255) * 100}%">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }));

    featuredContainer.innerHTML = `
        <div class="row">
            ${pokemonCards.join('')}
        </div>
    `;
}


// Funciones para Pokédex
async function loadPokedex(offset = 0, limit = 20) {
    const pokemonGrid = document.getElementById('pokemon-grid');
    if (!pokemonGrid) return;

    const pokemons = await fetchData(`/pokemon?offset=${offset}&limit=${limit}`);
    const pokemonDetails = await Promise.all(
        pokemons.results.map(pokemon => fetchData(`/pokemon/${pokemon.name}`))
    );

    pokemonDetails.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        pokemonGrid.insertAdjacentHTML('beforeend', pokemonCard);
    });
}

// Add these new berry-related functions

let currentBerryOffset = 0;
const BERRY_LIMIT = 20;

async function loadBerries(offset = 0, filters = {}) {
    const berriesGrid = document.getElementById('berries-grid');
    if (!berriesGrid) return;

    const berries = await fetchData(`/berry?offset=${offset}&limit=${BERRY_LIMIT}`);
    const berryDetails = await Promise.all(
        berries.results.map(async berry => {
            const berryData = await fetchData(`/berry/${berry.name}`);
            const berryItem = await fetchData(`/item/${berry.name}-berry`);
            return { ...berryData, item: berryItem };
        })
    );

    const filteredBerries = berryDetails.filter(berry => {
        if (filters.firmness && berry.firmness.name !== filters.firmness) return false;
        if (filters.flavors && filters.flavors.length > 0) {
            return berry.flavors.some(flavor => 
                filters.flavors.includes(flavor.flavor.name) && flavor.potency > 0
            );
        }
        return true;
    });

    const berryCards = filteredBerries.map(berry => `
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <img src="${berry.item.sprites.default}" 
                             class="berry-sprite me-3" 
                             alt="${berry.name} berry">
                        <div>
                            <h5 class="card-title pokemon-font">${berry.name.toUpperCase()}</h5>
                            <p class="mb-1">Firmeza: ${berry.firmness.name}</p>
                            <p class="mb-1">Tiempo de crecimiento: ${berry.growth_time} horas</p>
                            <div class="flavors-container">
                                ${berry.flavors
                                    .filter(f => f.potency > 0)
                                    .map(f => `
                                        <span class="flavor-badge ${f.flavor.name}">
                                            ${f.flavor.name} (${f.potency})
                                        </span>
                                    `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    if (offset === 0) {
        berriesGrid.innerHTML = berryCards;
    } else {
        berriesGrid.insertAdjacentHTML('beforeend', berryCards);
    }
}

// Event listeners for berry filters
document.addEventListener('DOMContentLoaded', () => {
    const firmnessFilter = document.getElementById('firmness-filter');
    const flavorCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="flavor-"]');
    const loadMoreButton = document.getElementById('load-more-berries');

    if (firmnessFilter) {
        firmnessFilter.addEventListener('change', () => {
            currentBerryOffset = 0;
            loadBerriesWithFilters();
        });
    }

    flavorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentBerryOffset = 0;
            loadBerriesWithFilters();
        });
    });

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            currentBerryOffset += BERRY_LIMIT;
            loadBerriesWithFilters();
        });
    }
});

function loadBerriesWithFilters() {
    const firmness = document.getElementById('firmness-filter')?.value;
    const flavors = Array.from(document.querySelectorAll('input[type="checkbox"][id^="flavor-"]:checked'))
        .map(cb => cb.value);

    loadBerries(currentBerryOffset, { firmness, flavors });
}


// Funciones para Ubicaciones
async function loadLocations() {
    const regionList = document.getElementById('region-list');
    if (!regionList) return;

    const regions = await fetchData('/region');
    regionList.innerHTML = regions.results.map(region => `
        <button class="list-group-item list-group-item-action" 
                onclick="showRegionDetails('${region.name}')">
            ${region.name.toUpperCase()}
        </button>
    `).join('');
}

async function showRegionDetails(regionName) {
    const locationInfo = document.getElementById('location-info');
    if (!locationInfo) return;

    const regionData = await fetchData(`/region/${regionName}`);
    
    locationInfo.innerHTML = `
        <div class="region-header">
            <h3 class="pokemon-font mb-4">${regionName.toUpperCase()}</h3>
            <span class="badge bg-primary">
                <i class="material-icons">place</i>
                ${regionData.locations.length} Ubicaciones
            </span>
        </div>
        
        <div class="location-badges-container mt-4">
            ${regionData.locations.map(location => `
                <span class="badge location-badge" 
                      onclick="showLocationDetails('${location.name}')">
                    <i class="material-icons">explore</i>
                    ${formatLocationName(location.name)}
                </span>
            `).join('')}
        </div>
    `;
}

function formatLocationName(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


// Funciones para Movimientos
async function loadMoves(offset = 0, limit = 20) {
    const movesGrid = document.getElementById('moves-grid');
    if (!movesGrid) return;

    const moves = await fetchData(`/move?offset=${offset}&limit=${limit}`);
    const moveDetails = await Promise.all(
        moves.results.map(move => fetchData(`/move/${move.name}`))
    );

    movesGrid.innerHTML = moveDetails.map(move => createMoveCard(move)).join('');
}

// Funciones auxiliares para crear cards
function createPokemonCard(pokemon) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" 
                     class="card-img-top pokemon-sprite" 
                     alt="${pokemon.name}">
                <div class="card-body text-center">
                    <h5 class="card-title pokemon-font">${pokemon.name.toUpperCase()}</h5>
                    <div class="pokemon-types">
                        ${pokemon.types.map(type => 
                            `<span class="type-badge bg-${type.type.name}">${type.type.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createBerryCard(berry) {
    return `
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title pokemon-font">${berry.name.toUpperCase()}</h5>
                    <p>Tiempo de crecimiento: ${berry.growth_time} horas</p>
                    <p>Tamaño máximo: ${berry.max_harvest}</p>
                </div>
            </div>
        </div>
    `;
}

function createMoveCard(move) {
    return `
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title pokemon-font">${move.name.toUpperCase()}</h5>
                    <span class="type-badge bg-${move.type.name}">${move.type.name}</span>
                    <p class="mt-2">Poder: ${move.power || 'N/A'}</p>
                    <p>Precisión: ${move.accuracy || 'N/A'}</p>
                    <p>PP: ${move.pp}</p>
                </div>
            </div>
        </div>
    `;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    showFeaturedPokemon();
    
    // Inicializar página según su ID
    const pageId = document.body.id;
    switch(pageId) {
        case 'pokedex-page':
            loadPokedex();
            break;
        case 'berries-page':
            loadBerries();
            break;
        case 'locations-page':
            loadLocations();
            break;
        case 'moves-page':
            loadMoves();
            break;
    }
});


// Items functionality
async function loadItems(category = null) {
    const itemsGrid = document.getElementById('items-grid');
    if (!itemsGrid) return;

    const endpoint = category ? `/item-category/${category}` : '/item?limit=20';
    const items = await fetchData(endpoint);
    
    const itemDetails = await Promise.all(
        items.results.map(item => fetchData(`/item/${item.name}`))
    );

    itemsGrid.innerHTML = itemDetails.map(item => `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${item.sprites.default}" class="card-img-top p-3" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title pokemon-font">${item.name.toUpperCase()}</h5>
                    <p class="card-text">${item.effect_entries[0]?.short_effect || 'No description available'}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Evolution chain functionality
async function loadEvolutionChain(pokemonName) {
    const evolutionChain = document.getElementById('evolution-chain');
    if (!evolutionChain) return;

    const species = await fetchData(`/pokemon-species/${pokemonName}`);
    const evolution = await fetchData(species.evolution_chain.url);

    function createEvolutionNode(chain) {
        let html = `
            <div class="evolution-node">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(chain.species.url)}.png">
                <p class="pokemon-font">${chain.species.name}</p>
            </div>
        `;
        
        if (chain.evolves_to.length > 0) {
            html += `<div class="evolution-arrow">→</div>`;
            html += chain.evolves_to.map(createEvolutionNode).join('');
        }
        
        return html;
    }

    evolutionChain.innerHTML = createEvolutionNode(evolution.chain);
}

