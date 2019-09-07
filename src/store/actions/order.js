import {
    UPDATE_BURGER_PURCHASE_SUCCESS, UPDATE_BURGER_PURCHASE_FAILURE, START_BURGER_PURCHASE,
    INIT_PURCHASE,
    START_ORDERS_FETCH, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE
} from './actionTypes';
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

export const startOrdersFetch = () => {
    return {
        type: START_ORDERS_FETCH
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: FETCH_ORDERS_FAILURE,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(startOrdersFetch());
        axios.get('/orders.json')
            .then( response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                return dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => dispatch(fetchOrdersFailure(error)));
    }
}