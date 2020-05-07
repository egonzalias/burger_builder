import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import axios from '../../../net/axio-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import './ContactData.css'

class ContactData extends Component {

    state = {
        loading: false,
        formIsValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
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
                validation:{
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
                validation:{
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
                validation:{
                    isRequired: false,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount() {
        //console.log(this.props);
    }

    orderHandler = (event) => {
        event.preventDefault();
        const customerData = {};

        for(let item in this.state.orderForm){
            customerData[item] = this.state.orderForm[item].value;
        }
        
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: customerData,
            observations: ''
        }

        axios.post('createOrder.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error:' + error);
                this.setState({ loading: false });
            })

    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.isRequired){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
        
    

    inputChangedHandler = (event, id) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const elementForm = {...updatedOrderForm[id]};
        elementForm.value = event.target.value;
        elementForm.valid = this.checkValidity(elementForm.value, elementForm.validation);
        elementForm.touched = true;
        updatedOrderForm[id] = elementForm;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    
    render() {
        const elementArray = [];
        for (let key in this.state.orderForm) {
            elementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {elementArray.map(item => (
                    <Input
                        key={item.id}
                        elementType={item.config.elementType}
                        elementConfig={item.config.elementConfig}
                        value={item.config.value}
                        invalid={!item.config.valid}
                        changed={(event) => this.inputChangedHandler(event, item.id)}/>
                ))}
                <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className='ContactData'>
                <h4>Enter you contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps) (withRouter(ContactData));