import React from 'react';
import PropTypes from 'prop-types'
import './BurgerIngredient.css'

const BurgerIngredient = props => {

    let ingredients = null;

    switch (props.type) {

        case ('bread-top'):
            ingredients = <div className='BreadTop'></div>;
            break;

        case ('bread-bottom'):
            ingredients = <div className='BreadBottom'></div>;
            break;

        case ('salad'):
            ingredients = <div className='Salad'></div>;
            break;

        case ('meat'):
            ingredients = <div className='Meat'></div>;
            break;

        case ('cheese'):
            ingredients = <div className='Cheese'></div>;
            break;

        case ('bacon'):
            ingredients = <div className='Bacon'></div>;
            break;

        default:
            ingredients = null;
    }

    return ingredients;
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;