import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    //const {onIngredientsInit} = props;

    const dispatch = useDispatch();

    const onIngredientAdded = (igName) => dispatch(actions.addIngredient(igName));
    const onIngredientRemoved = (igName) => dispatch(actions.removeIngredient(igName));
    const onIngredientsInit = useCallback(() => dispatch(actions.initIngredients()),[dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onAuthSetRedirectPath = (path) => dispatch(actions.authSetRedirectPath(path));

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => state.auth.token !== null);

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
        if (isAuth) {
            setPurchasing(true);
        } else {
            onAuthSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchasingCancelHandler = () => {
        setPurchasing(false);
    }

    const purchasingContinuedHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    useEffect(() => {
        onIngredientsInit();
    }, [onIngredientsInit]);

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be load. Please refresh the page</p> : <Spinner />;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchasingHandler}
                    price={price}
                    isAuth={isAuth} />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredients={ings}
            purchaseCanceled={purchasingCancelHandler}
            purchaseContinued={purchasingContinuedHandler}
            price={price} />;
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


export default withErrorHandler(BurgerBuilder, axios);