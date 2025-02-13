const BASE_URL = 'https://pokeapi.co/api/v2';

// Helper function to get Pokemon ID from species URL
export function getPokemonId(url) {
    return url.split('/').filter(Boolean).pop();
}

// Base fetch function
export async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
