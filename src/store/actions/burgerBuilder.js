import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  SET_INGREDIENTS_FETCH_FAILED,
  SET_PRICE  
} from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsFetchFailed = () => {
    return {
        type: SET_INGREDIENTS_FETCH_FAILED
    }
}

export const setPrice = (price) => {
    return {
        type: SET_PRICE,
        price: price
    }
}

export const initIngredients = () => {
    return dispatch => {
        dispatch(setPrice(4.00));
        axios.get('/ingredients.json')
        .then(response => {
            return dispatch(setIngredients(response.data))
        })
        .catch(error => {
            return dispatch(setIngredientsFetchFailed())
        })
    }
}