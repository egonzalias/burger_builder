import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../utility/utility'
import './Auth.css'

class Auth extends Component {

    state = {
        controls: {
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
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: false
    }

    componentDidMount = () =>{
        /*if(!this.props.burgerBuilding  && this.props.authRedirectPath !== '/'){
            this.props.onAuthSetRedirectPath();
        }*/
        
    }

    inputChangedHandler = (event, controlName) => {
        const updatedForm = { ...this.state.controls };
        const elementForm = { ...updatedForm[controlName] };
        elementForm.value = event.target.value;
        elementForm.valid = checkValidity(elementForm.value, elementForm.validation);
        elementForm.touched = true;
        updatedForm[controlName] = elementForm;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ controls: updatedForm, formIsValid: formIsValid });
    }

    signUpHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, true);
    }

    signInHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, false);
    }

    render() {
        const elementArray = [];
        for (let key in this.state.controls) {
            elementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let errorMessage = null;
        if (this.props.error) {
            //this.props.error.code
            errorMessage = <p>{this.props.error}</p>
        }

        let form = elementArray.map(item => (
            <Input
                key={item.id}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                invalid={!item.config.valid}
                touched={item.config.touched}
                changed={(event) => this.inputChangedHandler(event, item.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className='Auth'>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button
                        clicked={this.signInHandler}
                        id='sabrosito'
                        type="Success">SIGN IN</Button>
                    <Button
                        clicked={this.signUpHandler}
                        type="Danger">SIGN UP</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        burgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onAuthSetRedirectPath: () => dispatch(actions.authSetRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);