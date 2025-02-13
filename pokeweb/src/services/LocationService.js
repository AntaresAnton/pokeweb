import { fetchData } from './api';

export async function getLocations() {
    return await fetchData('/region');
}

export async function getRegionDetails(regionName) {
    return await fetchData(`/region/${regionName}`);
}

export function formatLocationName(name) {
    return name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
