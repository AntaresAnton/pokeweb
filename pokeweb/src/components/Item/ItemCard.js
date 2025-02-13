import React from 'react';
import { Icon } from '@mui/material';

function ItemCard({ item }) {
    return (
        <div className="col-sm-6 col-md-4" data-aos="fade-up">
            <div className="card item-card h-100">
                <div className="card-header text-center">
                    <img 
                        src={item.sprite}
                        className="item-sprite"
                        alt={item.name}
                        onError={(e) => {e.target.src='assets/images/item-placeholder.png'}}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title pokemon-font text-center">{item.name}</h5>
                    <p className="item-description">{item.description}</p>
                    <div className="item-details">
                        <span className="badge bg-primary">
                            <Icon>sell</Icon>
                            {item.cost}₽
                        </span>
                        <span className="badge bg-secondary">
                            {item.category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
