import React, { } from 'react'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContacData/ContactData'

const Checkout = props => {

    const checkoutCancelledHanlder = () => {
        props.history.goBack();
    }

    const checkoutContinuedHanlder = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />;

    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={checkoutCancelledHanlder}
                    checkoutContinued={checkoutContinuedHanlder} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }

    return summary;

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);
