import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        })
        .reduce((arr, el) => arr.concat(el), []);
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button buttonType='Danger' onClick={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType='Success' onClick={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;