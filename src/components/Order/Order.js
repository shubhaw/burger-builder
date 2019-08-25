import React from 'react';
import styleClasses from './Order.module.css';

const Order = (props) => {

    const ingredients = [];
    for(let igName in props.ingredients) {
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        });
    }

    const ingredientsOutput = ingredients.map(ingredient => {
        return (
            <span style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '4px 4px',
                border: '1px solid #ccc',
                padding: '2px 5px',
                borderRadius: '4px'
            }} key={ingredient.name}>
                {ingredient.name} ({ingredient.amount})
            </span>
            );
    })
    return (
        <div className={styleClasses.Order}>
            <p><strong>Ingredients:</strong> {ingredientsOutput}</p>
            <p><strong>Price:</strong> ${Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    );
};

export default Order;