import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliar'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentDidUpdate(){
        //console.log('[componentWillUpdate]');
    }

    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return  <li key={igKey}>
                        <span>{igKey}</span> : {this.props.ingredients[igKey]}
                    </li>
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button type='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button type='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
} 

export default OrderSummary;