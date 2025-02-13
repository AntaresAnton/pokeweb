import { fetchData } from './api';

export async function getItems(category = null) {
    const endpoint = category ? `/item-category/${category}` : '/item?limit=20';
    const items = await fetchData(endpoint);
    return Promise.all(items.results.map(item => fetchData(`/item/${item.name}`)));
}
