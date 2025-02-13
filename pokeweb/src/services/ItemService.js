// import { fetchData } from './api';

// export async function getItems(category = null) {
//     const endpoint = category ? `/item-category/${category}` : '/item?limit=20';
//     const items = await fetchData(endpoint);
//     return Promise.all(items.results.map(item => fetchData(`/item/${item.name}`)));
// }

import { fetchData } from './api';

const LIMIT = 20;

export async function getItemCategories() {
    const categories = await fetchData('/item-category');
    return categories.results.map(category => ({
        name: category.name,
        displayName: formatCategoryName(category.name)
    }));
}

export async function getItems(offset = 0, category = '') {
    const endpoint = category ? 
        `/item-category/${category}` : 
        `/item?offset=${offset}&limit=${LIMIT}`;
    
    const response = await fetchData(endpoint);
    let itemsToProcess = [];

    if (category) {
        const categoryData = await fetchData(`/item-category/${category}`);
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

    return itemDetails.map(item => ({
        name: formatItemName(item.name),
        sprite: item.sprites.default,
        description: item.effect_entries[0]?.short_effect || 'No description available',
        cost: item.cost,
        category: item.category.name
    }));
}

export async function searchItem(query) {
    if (!query) return null;
    return await fetchData(`/item/${query.toLowerCase()}`);
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
