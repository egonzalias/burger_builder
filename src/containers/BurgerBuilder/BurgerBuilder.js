import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../net/axio-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'

const INGREDIENTS_PRICE = {
    meat: 1.2,
    cheese: 0.5,
    bacon: 0.9,
    salad: 0.2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        price: 0,
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
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        const priceAddition = INGREDIENTS_PRICE[type] + this.state.price;
        updateIngredients[type] = newCount;
        this.setState({price: priceAddition, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount <= 0)
            return;
        const newCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        const priceDeduction = INGREDIENTS_PRICE[type] - this.state.price;
        updateIngredients[type] = newCount;
        this.setState({price: priceDeduction, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing:true});
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchasingContinuedHandler = () => {

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        
    }

    componentDidMount (){
        axios.get('ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        })
    }

    render() {        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be load. Please refresh the page</p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                    price={this.state.price}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchasingCancelHandler}
                purchaseContinued={this.purchasingContinuedHandler}
                price={this.state.price}/>;
        }

        if (this.state.loading){
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

export default withErrorHandler(BurgerBuilder, axios);