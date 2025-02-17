let currentOffset = 0;
const LIMIT = 20;
let currentFilters = {
    type: '',
    category: '',
    power: 0
};

async function initMoves() {
    await loadMoveTypes();
    loadMoves();
    setupEventListeners();
}

async function loadMoveTypes() {
    const typeSelect = document.getElementById('move-type-filter');
    try {
        const types = await fetchData('/type');
        typeSelect.innerHTML = `
            <option value="">Todos los tipos</option>
            ${types.results.map(type => 
                `<option value="${type.name}">${type.name.toUpperCase()}</option>`
            ).join('')}
        `;
    } catch (error) {
        console.error('Error loading move types:', error);
    }
}

async function loadMoves(offset = 0) {
    const movesGrid = document.getElementById('moves-grid');
    const loadMoreBtn = document.getElementById('load-more-moves');
    
    loadMoreBtn.disabled = true;
    
    try {
        const moves = await fetchData(`/move?offset=${offset}&limit=${LIMIT}`);
        const moveDetails = await Promise.all(
            moves.results.map(move => fetchData(`/move/${move.name}`))
        );

        const filteredMoves = moveDetails.filter(move => {
            if (currentFilters.type && move.type.name !== currentFilters.type) return false;
            if (currentFilters.category && move.damage_class.name !== currentFilters.category) return false;
            if (currentFilters.power && move.power < currentFilters.power) return false;
            return true;
        });

        const moveCards = filteredMoves.map(move => createMoveCard(move));
        
        if (offset === 0) {
            movesGrid.innerHTML = moveCards.join('');
        } else {
            movesGrid.insertAdjacentHTML('beforeend', moveCards.join(''));
        }
        
        loadMoreBtn.disabled = false;
        
    } catch (error) {
        console.error('Error loading moves:', error);
        loadMoreBtn.disabled = false;
    }
}

function createMoveCard(move) {
    return `
        <div class="col-md-6" data-aos="fade-up">
            <div class="card move-card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span class="pokemon-font">${move.name.toUpperCase()}</span>
                    <span class="badge type-badge type-${move.type.name}">${move.type.name}</span>
                </div>
                <div class="card-body">
                    <div class="move-stats">
                        <div class="stat-row">
                            <span class="stat-label">Potencia:</span>
                            <span class="stat-value">${move.power || 'N/A'}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">Precisión:</span>
                            <span class="stat-value">${move.accuracy || 'N/A'}</span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">PP:</span>
                            <span class="stat-value">${move.pp}</span>
                        </div>
                    </div>
                    <div class="move-category mt-3">
                        <span class="category-badge ${move.damage_class.name}">
                            <i class="material-icons category-icon">
                                ${getCategoryIcon(move.damage_class.name)}
                            </i>
                            ${move.damage_class.name}
                        </span>
                    </div>
                    <p class="move-description mt-3">
                        ${move.effect_entries[0]?.short_effect || 'No description available'}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function getCategoryIcon(category) {
    switch(category) {
        case 'physical': return 'fitness_center';
        case 'special': return 'auto_awesome';
        case 'status': return 'psychology';
        default: return 'help_outline';
    }
}

function setupEventListeners() {
    const loadMoreBtn = document.getElementById('load-more-moves');
    const searchBtn = document.getElementById('search-move-btn');
    const searchInput = document.getElementById('move-search');
    const typeFilter = document.getElementById('move-type-filter');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const powerFilter = document.getElementById('power-filter');
    const powerValue = document.getElementById('power-value');
    
    loadMoreBtn.addEventListener('click', () => {
        currentOffset += LIMIT;
        loadMoves(currentOffset);
    });
    
    searchBtn.addEventListener('click', () => {
        searchMove(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchMove(searchInput.value);
        }
    });
    
    typeFilter.addEventListener('change', () => {
        currentFilters.type = typeFilter.value;
        resetAndReload();
    });
    
    categoryFilters.forEach(radio => {
        radio.addEventListener('change', () => {
            currentFilters.category = radio.value;
            resetAndReload();
        });
    });
    
    powerFilter.addEventListener('input', () => {
        powerValue.textContent = powerFilter.value;
        currentFilters.power = parseInt(powerFilter.value);
    });
}

function resetAndReload() {
    currentOffset = 0;
    loadMoves(0);
}

async function searchMove(query) {
    if (!query) return;
    
    try {
        const move = await fetchData(`/move/${query.toLowerCase()}`);
        const movesGrid = document.getElementById('moves-grid');
        movesGrid.innerHTML = createMoveCard(move);
    } catch (error) {
        console.error('Move not found:', error);
    }
}

document.addEventListener('DOMContentLoaded', initMoves);
