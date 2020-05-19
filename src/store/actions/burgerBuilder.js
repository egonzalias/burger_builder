import * as actionTypes  from './actionTypes'
import axios from '../../net/axio-orders'

/*File for action creators, that allow us run asynchronous code*/
export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: igName
    }
}

export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: igName
    }
}

export const setInitIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setInitIngredientsError = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_ERROR,
        error: true
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('ingredients.json')
        .then(response => {
            dispatch(setInitIngredients(response.data));
        })
        .catch(error => {
            dispatch(setInitIngredientsError());
        })
    }
}