import React, { useState, useEffect } from 'react';
import { getItemCategories, getItems, searchItem } from '../services/ItemService';
import ItemCard from './Item/ItemCard';
import { debounce } from 'lodash';

function Items() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [currentOffset, setCurrentOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCategories();
        loadItems();
    }, []);

    const loadCategories = async () => {
        const categoriesData = await getItemCategories();
        setCategories(categoriesData);
    };

    const loadItems = async (offset = 0) => {
        setLoading(true);
        try {
            const itemsData = await getItems(offset, currentCategory);
            setItems(offset === 0 ? itemsData : [...items, ...itemsData]);
        } catch (error) {
            console.error('Error loading items:', error);
        }
        setLoading(false);
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setCurrentOffset(0);
        loadItems(0);
    };

    const handleLoadMore = () => {
        const newOffset = currentOffset + 20;
        setCurrentOffset(newOffset);
        loadItems(newOffset);
    };

    const handleSearch = debounce(async (query) => {
        setSearchQuery(query);
        if (!query) {
            loadItems(0);
            return;
        }
        try {
            const item = await searchItem(query);
            if (item) {
                setItems([item]);
            }
        } catch (error) {
            console.error('Item not found:', error);
        }
    }, 300);

    return (
        <main className="container mt-4">
            <h1 className="pokemon-font text-center mb-4" data-aos="fade-down">Items Pokémon</h1>
            
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group" id="item-categories">
                        <button 
                            className={`list-group-item list-group-item-action ${!currentCategory ? 'active' : ''}`}
                            onClick={() => handleCategoryClick('')}
                        >
                            Todas las categorías
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.name}
                                className={`list-group-item list-group-item-action ${currentCategory === category.name ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                {category.displayName}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="col-md-9">
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Buscar items..."
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    
                    <div className="row" id="items-grid">
                        {items.map((item, index) => (
                            <ItemCard key={index} item={item} />
                        ))}
                    </div>
                    
                    {!searchQuery && (
                        <button
                            className="btn btn-primary d-block mx-auto mt-4"
                            onClick={handleLoadMore}
                            disabled={loading}
                        >
                            {loading ? 'Cargando...' : 'Cargar más'}
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Items;
