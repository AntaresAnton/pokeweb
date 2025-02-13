import { fetchData } from './api';

const LIMIT = 20;

export async function getBerries(offset = 0, filters = {}) {
    const response = await fetchData(`/berry?offset=${offset}&limit=${LIMIT}`);
    const berryDetails = await Promise.all(
        response.results.map(berry => fetchData(`/berry/${berry.name}`))
    );

    return berryDetails.filter(berry => {
        if (filters.firmness && berry.firmness.name !== filters.firmness) return false;
        if (filters.flavors.length > 0) {
            return filters.flavors.some(flavor => 
                berry.flavors.some(f => f.flavor.name === flavor)
            );
        }
        return true;
    });
}
