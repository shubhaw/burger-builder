import { UPDATE_BURGER_PURCHASE_SUCCESS, UPDATE_BURGER_PURCHASE_FAILURE, START_BURGER_PURCHASE, INIT_PURCHASE } from '../actions/actionTypes';

const initialState = {
    orders: [],
    isLoading: false,
    isPurchased: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case INIT_PURCHASE:
            return {
                ...state,
                isPurchased: false
            }
        case START_BURGER_PURCHASE:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_BURGER_PURCHASE_SUCCESS:
            const newOrder = {
                ...actions.orderData,
                id: actions.orderId,
            }
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                isLoading: false,
                isPurchased: true
            };
        case UPDATE_BURGER_PURCHASE_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export default reducer;