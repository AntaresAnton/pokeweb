import { useState, useEffect, useCallback } from 'react';

const usePokeData = (initialState = [], dependencies = []) => {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFunction = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const json = await response.json();
            
            // Fetch detailed data for each Pokemon
            const detailedData = await Promise.all(
                json.results.map(async (pokemon) => {
                    const detailResponse = await fetch(pokemon.url);
                    return detailResponse.json();
                })
            );
            
            setData(detailedData);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, []); // Empty dependency array since this function doesn't depend on any external values

    useEffect(() => {
        fetchFunction();
    }, [fetchFunction, ...dependencies]); // Include fetchFunction and any additional dependencies

    return { data, loading, error };
};

export default usePokeData;
