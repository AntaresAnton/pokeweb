import { fetchData } from './api';

const LIMIT = 20;

export async function getMoveTypes() {
    const types = await fetchData('/type');
    return types.results.map(type => ({
        name: type.name,
        displayName: type.name.toUpperCase()
    }));
}

export async function getMoves(offset = 0, filters = {}) {
    const moves = await fetchData(`/move?offset=${offset}&limit=${LIMIT}`);
    const moveDetails = await Promise.all(
        moves.results.map(move => fetchData(`/move/${move.name}`))
    );

    return moveDetails.filter(move => {
        if (filters.type && move.type.name !== filters.type) return false;
        if (filters.category && move.damage_class.name !== filters.category) return false;
        if (filters.power && move.power < filters.power) return false;
        return true;
    });
}

export async function searchMove(query) {
    if (!query) return null;
    return await fetchData(`/move/${query.toLowerCase()}`);
}

export function getCategoryIcon(category) {
    const icons = {
        physical: 'fitness_center',
        special: 'auto_awesome',
        status: 'psychology'
    };
    return icons[category] || 'help_outline';
}
