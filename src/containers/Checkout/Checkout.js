import React, { Component } from 'react'

import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContacData/ContactData'

class Checkout extends Component {

    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            salad: 0,
            meat: 0
        },
        price: 0
    } 

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query){
            if(param[0] === 'price'){
                price = param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutCancelledHanlder = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHanlder = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelledHanlder}
                    checkoutContinued = {this.checkoutContinuedHanlder}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.price}/>
                    )}/>
            </div>
        )
    }
}


export default Checkout;
