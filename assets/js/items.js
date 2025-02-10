let currentOffset = 0;
const LIMIT = 20;
let currentCategory = '';

async function initItems() {
    await loadCategories();
    loadItems();
    setupEventListeners();
}

async function loadCategories() {
    const categoriesContainer = document.getElementById('item-categories');
    try {
        const categories = await fetchData('/item-category');
        categoriesContainer.innerHTML = `
            <button class="list-group-item list-group-item-action active" data-category="">
                Todas las categorías
            </button>
            ${categories.results.map(category => `
                <button class="list-group-item list-group-item-action" 
                        data-category="${category.name}">
                    ${formatCategoryName(category.name)}
                </button>
            `).join('')}
        `;
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function loadItems(offset = 0) {
    const itemsGrid = document.getElementById('items-grid');
    const loadMoreBtn = document.getElementById('load-more-items');
    
    loadMoreBtn.disabled = true;
    
    try {
        const endpoint = currentCategory ? 
            `/item-category/${currentCategory}` : 
            `/item?offset=${offset}&limit=${LIMIT}`;
            
        const response = await fetchData(endpoint);
        let itemsToProcess = [];

        if (currentCategory) {
            const categoryData = await fetchData(`/item-category/${currentCategory}`);
            itemsToProcess = categoryData.items || [];
        } else {
            itemsToProcess = response.results || [];
        }

        const itemDetails = await Promise.all(
            itemsToProcess.map(item => {
                const itemName = item.name || item.url.split('/').slice(-2)[0];
                return fetchData(`/item/${itemName}`);
            })
        );

        const itemCards = itemDetails.map(item => createItemCard(item));
        
        if (offset === 0) {
            itemsGrid.innerHTML = itemCards.join('');
        } else {
            itemsGrid.insertAdjacentHTML('beforeend', itemCards.join(''));
        }
        
        loadMoreBtn.disabled = false;
        
    } catch (error) {
        console.error('Error loading items:', error);
        loadMoreBtn.disabled = false;
        itemsGrid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    No se encontraron items en esta categoría
                </div>
            </div>
        `;
    }
}


function createItemCard(item) {
    return `
        <div class="col-sm-6 col-md-4" data-aos="fade-up">
            <div class="card item-card h-100">
                <div class="card-header text-center">
                    <img src="${item.sprites.default}" 
                         class="item-sprite" 
                         alt="${item.name}"
                         onerror="this.src='assets/images/item-placeholder.png'">
                </div>
                <div class="card-body">
                    <h5 class="card-title pokemon-font text-center">${formatItemName(item.name)}</h5>
                    <p class="item-description">
                        ${item.effect_entries[0]?.short_effect || 'No description available'}
                    </p>
                    <div class="item-details">
                        <span class="badge bg-primary">
                            <i class="material-icons">sell</i>
                            ${item.cost}₽
                        </span>
                        <span class="badge bg-secondary">
                            ${item.category.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatCategoryName(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatItemName(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function setupEventListeners() {
    const loadMoreBtn = document.getElementById('load-more-items');
    const searchInput = document.getElementById('item-search');
    const categoryButtons = document.querySelectorAll('#item-categories button');
    
    loadMoreBtn.addEventListener('click', () => {
        currentOffset += LIMIT;
        loadItems(currentOffset);
    });
    
    searchInput.addEventListener('input', debounce(() => {
        searchItems(searchInput.value);
    }, 300));
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            currentOffset = 0;
            loadItems(0);
        });
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

async function searchItems(query) {
    if (!query) {
        currentOffset = 0;
        loadItems(0);
        return;
    }
    
    try {
        const item = await fetchData(`/item/${query.toLowerCase()}`);
        const itemsGrid = document.getElementById('items-grid');
        itemsGrid.innerHTML = createItemCard(item);
    } catch (error) {
        console.error('Item not found:', error);
    }
}

document.addEventListener('DOMContentLoaded', initItems);
