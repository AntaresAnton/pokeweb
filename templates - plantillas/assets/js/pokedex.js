const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

let currentOffset = 0;
const LIMIT = 20;
let currentFilters = {
    types: [],
    generation: '',
    sort: 'id'
};

// Initialize Pokedex
function initPokedex() {
    createTypeFilters();
    loadPokemon();
    setupEventListeners();
}

// Create type filter buttons
function createTypeFilters() {
    const typeFiltersContainer = document.getElementById('type-filters');
    POKEMON_TYPES.forEach(type => {
        const button = document.createElement('button');
        button.className = `btn btn-sm type-filter type-${type}`;
        button.dataset.type = type;
        button.textContent = type;
        typeFiltersContainer.appendChild(button);
    });
}

// Load Pokemon with filters
async function loadPokemon(offset = 0) {
    const pokemonGrid = document.getElementById('pokemon-grid');
    const loadMoreBtn = document.getElementById('load-more');
    
    loadMoreBtn.disabled = true;
    
    try {
        const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${LIMIT}`);
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
            data.results.map(async pokemon => {
                const details = await fetchData(`/pokemon/${pokemon.name}`);
                return details;
            })
        );

        const filteredPokemon = pokemonDetails.filter(pokemon => {
            if (currentFilters.types.length > 0) {
                const pokemonTypes = pokemon.types.map(t => t.type.name);
                return currentFilters.types.some(type => pokemonTypes.includes(type));
            }
            return true;
        });

        const pokemonCards = filteredPokemon.map(pokemon => createPokemonCard(pokemon));
        
        if (offset === 0) {
            pokemonGrid.innerHTML = pokemonCards.join('');
        } else {
            pokemonGrid.insertAdjacentHTML('beforeend', pokemonCards.join(''));
        }
        
        loadMoreBtn.disabled = false;
        
    } catch (error) {
        console.error('Error loading Pokemon:', error);
        loadMoreBtn.disabled = false;
    }
}



// Setup Event Listeners
function setupEventListeners() {
    const loadMoreBtn = document.getElementById('load-more');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('pokemon-search');
    const typeFilters = document.querySelectorAll('.type-filter');
    const generationFilter = document.getElementById('generation-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    loadMoreBtn.addEventListener('click', () => {
        currentOffset += LIMIT;
        loadPokemon(currentOffset);
    });
    
    searchBtn.addEventListener('click', () => {
        searchPokemon(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPokemon(searchInput.value);
        }
    });
    
    typeFilters.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            currentFilters.types = Array.from(document.querySelectorAll('.type-filter.active'))
                .map(btn => btn.dataset.type);
            resetAndReload();
        });
    });
    
    generationFilter.addEventListener('change', () => {
        currentFilters.generation = generationFilter.value;
        resetAndReload();
    });
    
    sortFilter.addEventListener('change', () => {
        currentFilters.sort = sortFilter.value;
        resetAndReload();
    });
}

// Reset and Reload Pokemon
function resetAndReload() {
    currentOffset = 0;
    loadPokemon(0);
}

// Search Pokemon
async function searchPokemon(query) {
    if (!query) return;
    
    try {
        const pokemon = await fetchData(`/pokemon/${query.toLowerCase()}`);
        const pokemonGrid = document.getElementById('pokemon-grid');
        pokemonGrid.innerHTML = createPokemonCard(pokemon);
    } catch (error) {
        console.error('Pokemon not found:', error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPokedex);
