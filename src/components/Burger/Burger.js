import React from 'react'

import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import './Burger.css'

const burger = (props)  => {

    let ingredients = Object.keys(props.ingredients)
    .map(key =>{
        return [...Array(props.ingredients[key])].map((index,value) => {
            return <BurgerIngredient key={key+value} type={key}/>;
        })
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);

    if(ingredients.length === 0){
        ingredients = <p>Please start adding ingredients!</p>
    }

    return(
        <div className='Burger'>
            <BurgerIngredient type='bread-top'/>
            {ingredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;