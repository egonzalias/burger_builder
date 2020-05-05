import React from 'react';

import './CheckoutSummary.css'
import Burger from "../Burger";
import Button from '../../UI/Button/Button'


const checkoutSummary = (props) => {

    return(
        <div className='CheckoutSummary'>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                type='Danger'
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                type='Success'
                clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;