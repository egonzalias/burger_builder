import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import axios from '../../../net/axio-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler'
import { checkValidity } from '../../../utility/utility'
import './ContactData.css'

const ContactData = props => {

    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                isRequired: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                isRequired: true
            },
            valid: false,
            touched: false
        },
        number: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Your Phone number'
            },
            value: '',
            validation: {
                isRequired: true,
                minLength: 7,
                maxLength: 12
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                isRequired: false,
                isEmail: true
            },
            valid: false,
            touched: false
        }
    });

    /*state = {
        formIsValid: false,
        orderForm: 
    }*/

    const orderHandler = (event) => {
        event.preventDefault();
        const customerData = {};

        for (let item in orderForm) {
            customerData[item] = orderForm[item].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            customer: customerData,
            observations: '',
            userId: props.userId
        }
        props.onSenderPurchaseOrder(order);
    }

    const inputChangedHandler = (event, id) => {
        const updatedOrderForm = { ...orderForm };
        const elementForm = { ...updatedOrderForm[id] };
        elementForm.value = event.target.value;
        elementForm.valid = checkValidity(elementForm.value, elementForm.validation);
        elementForm.touched = true;
        updatedOrderForm[id] = elementForm;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }


    const elementArray = [];
    for (let key in orderForm) {
        elementArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {elementArray.map(item => (
                <Input
                    key={item.id}
                    elementType={item.config.elementType}
                    elementConfig={item.config.elementConfig}
                    value={item.config.value}
                    invalid={!item.config.valid}
                    changed={(event) => inputChangedHandler(event, item.id)} />
            ))}
            <Button type="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className='ContactData'>
            <h4>Enter you contact data</h4>
            {form}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSenderPurchaseOrder: (orderData) => dispatch(actions.sendPurchaseOrder(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));