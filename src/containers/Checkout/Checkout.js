import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContacData/ContactData'

class Checkout extends Component {

    state = {
    }

    componentDidMount() {
    }

    checkoutCancelledHanlder = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHanlder = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" /> ;

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHanlder}
                        checkoutContinued={this.checkoutContinuedHanlder} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
