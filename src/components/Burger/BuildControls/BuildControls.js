import React from 'react';
import styleClasses from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
    return (
        
        <div className={styleClasses.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                    // added={props.ingredientAdded}
                    // type={control.type}
                     />
            ))}
            <button 
            className={styleClasses.OrderButton}
            disabled={!props.isPurchasable}
            >ORDER NOW</button>
        </div>
    );
};

export default buildControls;