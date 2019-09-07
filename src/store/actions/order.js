import { UPDATE_BURGER_PURCHASE_SUCCESS, UPDATE_BURGER_PURCHASE_FAILURE, START_BURGER_PURCHASE, INIT_PURCHASE } from './actionTypes';
import axios from '../../axios-orders';

export const updateBurgerPurchaseSuccess = (orderId, orderData) => {
    return {
        type: UPDATE_BURGER_PURCHASE_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
}

export const updateBurgerPurchaseFailure = (error) => {
    return {
        type: UPDATE_BURGER_PURCHASE_FAILURE,
        error: error
    }
}

export const startBurgerPurchase = () => {
    return {
        type: START_BURGER_PURCHASE
    }
}

export const purchaseBurger = orderDetails => {
    return dispatch => {
        dispatch(startBurgerPurchase());
        axios.post('/orders.json', orderDetails)
            .then(response => {
                dispatch(updateBurgerPurchaseSuccess(response.data.name, orderDetails))
            })
            .catch(error => {
                dispatch(updateBurgerPurchaseFailure(error))
            });
    }
}

export const initPurchase = () => {
    return {
        type: INIT_PURCHASE
    }
}