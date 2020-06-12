import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../utility/utility'
import './Auth.css'

const Auth = props => {

    const [, setFormIsValid] = useState(false);
    const [controls, setControls] = useState({
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
    });

    //componentDidMount = () => {
    /*if(!props.burgerBuilding  && props.authRedirectPath !== '/'){
        props.onAuthSetRedirectPath();
    }*/
    //}

    const inputChangedHandler = (event, controlName) => {
        const updatedForm = { ...controls };
        const elementForm = { ...updatedForm[controlName] };
        elementForm.value = event.target.value;
        elementForm.valid = checkValidity(elementForm.value, elementForm.validation);
        elementForm.touched = true;
        updatedForm[controlName] = elementForm;
        let isFormValid = true;
        for (let inputIdentifier in updatedForm) {
            isFormValid = updatedForm[inputIdentifier].valid && isFormValid;
        }
        setControls(updatedForm);
        setFormIsValid(isFormValid);
    }

    const signUpHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, true);
    }

    const signInHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, false);
    }

    const elementArray = [];
    for (let key in controls) {
        elementArray.push({
            id: key,
            config: controls[key]
        });
    }

    let errorMessage = null;
    if (props.error) {
        //props.error.code
        errorMessage = <p>{props.error}</p>
    }

    let form = elementArray.map(item => (
        <Input
            key={item.id}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            value={item.config.value}
            invalid={!item.config.valid}
            touched={item.config.touched}
            changed={(event) => inputChangedHandler(event, item.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className='Auth'>
            {authRedirect}
            {errorMessage}
            <form>
                {form}
                <Button
                    clicked={signInHandler}
                    id='sabrosito'
                    type="Success">SIGN IN</Button>
                <Button
                    clicked={signUpHandler}
                    type="Danger">SIGN UP</Button>
            </form>
        </div>
    )
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