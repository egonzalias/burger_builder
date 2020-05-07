import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../net/axio-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actionsType from '../../store/actions'


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0 ;
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasingCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchasingContinuedHandler = () => {
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        /*axios.get('ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        })*/
    }

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be load. Please refresh the page</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchasingHandler}
                        price={this.props.price} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchasingCancelHandler}
                purchaseContinued={this.purchasingContinuedHandler}
                price={this.props.price} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch({ type: actionsType.ADD_INGREDIENT, ingredientName: igName }),
        onIngredientRemoved: (igName) => dispatch({ type: actionsType.REMOVE_INGREDIENT, ingredientName: igName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));