import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContacData/ContactData'

class Checkout extends Component {

    state = {
    } 

    componentDidMount () {
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
                    ingredients={this.props.ings}
                    checkoutCancelled = {this.checkoutCancelledHanlder}
                    checkoutContinued = {this.checkoutContinuedHanlder}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
                    )}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps) (Checkout);
