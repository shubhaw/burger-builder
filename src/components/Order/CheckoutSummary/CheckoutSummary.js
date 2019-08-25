import React from 'react';
import styleClasses from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div className={styleClasses.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button buttonType="Danger" onClick>CANCEL</Button>
            <Button buttonType="Success" onClick>CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;