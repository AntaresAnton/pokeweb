let pokemonList = [];

async function initEvolution() {
    await loadPokemonList();
    setupEventListeners();
}

async function loadPokemonList() {
    const datalist = document.getElementById('pokemon-list');
    const response = await fetchData('/pokemon?limit=898');
    pokemonList = response.results;
    
    datalist.innerHTML = pokemonList.map((pokemon, index) => `
        <option value="${pokemon.name.toUpperCase()}">
            ${String(index + 1).padStart(3, '0')} - ${pokemon.name.toUpperCase()}
        </option>
    `).join('');
}

async function loadEvolutionChain(pokemonName) {
    const chainContainer = document.getElementById('evolution-chain');
    const detailsContainer = document.getElementById('evolution-details');
    
    try {
        const species = await fetchData(`/pokemon-species/${pokemonName}`);
        if (!species || !species.evolution_chain) {
            throw new Error('Evolution chain not found');
        }

        const chainId = species.evolution_chain.url.split('/').filter(Boolean).pop();
        const evolutionChain = await fetchData(`/evolution-chain/${chainId}`);
        
        if (!evolutionChain || !evolutionChain.chain) {
            throw new Error('Invalid evolution chain data');
        }

        let chainHtml = await createEvolutionChainHtml(evolutionChain.chain);
        chainContainer.innerHTML = `
            <div class="evolution-tree bg-light rounded-4 shadow-sm p-4 mb-4">
                ${chainHtml}
            </div>
        `;
        
        const details = await getEvolutionDetails(evolutionChain.chain);
        detailsContainer.innerHTML = `
            <div class="evolution-requirements bg-white rounded-4 shadow-sm p-4">
                <div class="d-flex align-items-center mb-4">
                    <i class="material-icons text-primary me-2">auto_awesome</i>
                    <h5 class="pokemon-font mb-0">Requisitos de Evolución</h5>
                </div>
                <div class="evolution-details-grid">
                    ${details}
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading evolution chain:', error);
        chainContainer.innerHTML = `
            <div class="alert alert-danger rounded-4 shadow-sm">
                <div class="d-flex align-items-center">
                    <i class="material-icons me-2">error_outline</i>
                    <span>No se pudo cargar la cadena evolutiva para ${pokemonName}</span>
                </div>
            </div>
        `;
    }
}




async function createEvolutionChainHtml(chain) {
    const pokemon = await fetchData(`/pokemon/${chain.species.name}`);
    let html = `
        <div class="evolution-stage">
            <div class="card evolution-card rounded-4 shadow-sm">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}"
                     class="card-img-top pokemon-sprite p-2"
                     alt="${pokemon.name}"
                     onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png'">
                <div class="card-body text-center p-2">
                    <h6 class="card-title pokemon-font mb-1 small">${pokemon.name.toUpperCase()}</h6>
                    <div class="pokemon-types">
                        ${pokemon.types.map(type =>
                            `<span class="type-badge bg-${type.type.name} rounded-pill px-2 py-1 me-1">${type.type.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    if (chain.evolves_to.length > 0) {
        html += `
            <div class="evolution-arrow">
                <i class="material-icons text-primary">arrow_forward</i>
            </div>
        `;
        for (const evolution of chain.evolves_to) {
            html += await createEvolutionChainHtml(evolution);
        }
    }
    
    return html;
}




async function getEvolutionDetails(chain, details = '') {
    if (chain.evolves_to.length > 0) {
        for (const evolution of chain.evolves_to) {
            const trigger = evolution.evolution_details[0];
            details += `
                <div class="evolution-detail">
                    <div class="from-to">
                        <span class="pokemon-font">${chain.species.name.toUpperCase()}</span>
                        <i class="material-icons">arrow_forward</i>
                        <span class="pokemon-font">${evolution.species.name.toUpperCase()}</span>
                    </div>
                    <div class="requirements">
                        ${formatEvolutionTrigger(trigger)}
                    </div>
                </div>
            `;
            details = await getEvolutionDetails(evolution, details);
        }
    }
    return details;
}

function formatEvolutionTrigger(trigger) {
    if (!trigger) return 'No evolution details available';
    
    let requirement = '';
    switch (trigger.trigger.name) {
        case 'level-up':
            requirement = trigger.min_level ? `Nivel ${trigger.min_level}` : 'Subir de nivel';
            break;
        case 'use-item':
            requirement = `Usar ${trigger.item.name}`;
            break;
        case 'trade':
            requirement = 'Intercambio';
            break;
        default:
            requirement = trigger.trigger.name;
    }
    
    return `<span class="badge bg-info">${requirement}</span>`;
}

function setupEventListeners() {
    const select = document.getElementById('pokemon-select');
    select.addEventListener('change', (e) => {
        if (e.target.value) {
            loadEvolutionChain(e.target.value);
        }
    });
}

document.addEventListener('DOMContentLoaded', initEvolution);
