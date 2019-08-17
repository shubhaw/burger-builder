import React from 'react';
import styleClasses from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    // console.log('props.ingredients.salad :', props.ingredients.salad);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log('igKey:', igKey, '| props.ingredients[igKey]:', props.ingredients[igKey]);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    console.log(transformedIngredients);
    
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
        
    return(
        <div className={styleClasses.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default Burger;