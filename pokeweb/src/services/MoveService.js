import { fetchData } from './api';

export async function getMoves(offset = 0, limit = 20) {
    const moves = await fetchData(`/move?offset=${offset}&limit=${limit}`);
    return Promise.all(moves.results.map(move => fetchData(`/move/${move.name}`)));
}
