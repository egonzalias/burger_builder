import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,//got from server
    totalPrice: 0,
    error: false
}

const INGREDIENTS_PRICE = {
    meat: 1.2,
    cheese: 0.5,
    bacon: 0.9,
    salad: 0.2
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }

        case actionTypes.INIT_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 0
            }

        case actionTypes.INIT_INGREDIENTS_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;