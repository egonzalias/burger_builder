import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,//for spinner
    purchased: false,//for route to home
    orders: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_INGREDIENTS_START:
            return {
                ...state,
                loading: true,
                purchased: false
            }

        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                loading: false,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true
            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                orders: []
            }

        default:
            return state;
    }
}

export default reducer;