import { fetchData } from './api';

export const BERRY_LIMIT = 20;

export async function getBerries(offset = 0, filters = {}) {
    const berries = await fetchData(`/berry?offset=${offset}&limit=${BERRY_LIMIT}`);
    const berryDetails = await Promise.all(
        berries.results.map(async berry => {
            const berryData = await fetchData(`/berry/${berry.name}`);
            const berryItem = await fetchData(`/item/${berry.name}-berry`);
            return { ...berryData, item: berryItem };
        })
    );

    return filterBerries(berryDetails, filters);
}

function filterBerries(berries, filters) {
    return berries.filter(berry => {
        if (filters.firmness && berry.firmness.name !== filters.firmness) return false;
        if (filters.flavors && filters.flavors.length > 0) {
            return berry.flavors.some(flavor =>
                filters.flavors.includes(flavor.flavor.name) && flavor.potency > 0
            );
        }
        return true;
    });
}
