import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../net/axio-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'


const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);
    const {onIngredientsInit} = props;

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    }

    const purchasingHandler = () => {
        if (props.isAuth) {
            setPurchasing(true);
        } else {
            props.onAuthSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchasingCancelHandler = () => {
        setPurchasing(false);
    }

    const purchasingContinuedHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    useEffect(() => {
        onIngredientsInit();
    }, [onIngredientsInit]);

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be load. Please refresh the page</p> : <Spinner />;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchasingHandler}
                    price={props.price}
                    isAuth={props.isAuth} />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={props.ings}
            purchaseCanceled={purchasingCancelHandler}
            purchaseContinued={purchasingContinuedHandler}
            price={props.price} />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchasingCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onIngredientsInit: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthSetRedirectPath: (path) => dispatch(actions.authSetRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));