import React from 'react'

import Aux from '../../../hoc/Auxiliar'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button type='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button type='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;