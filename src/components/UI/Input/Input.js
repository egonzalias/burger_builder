import React from 'react'

import './Input.css'

const input = (props) => {
    let inputElement = null;
    let classes = ['InputElement'];

    if(props.invalid && props.touched){
        classes.push('Invalid');
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
            className={classes.join(' ')}
            {...props.elementConfig} 
            onChange={props.changed}/>;
            break;
        case 'textarea':
            inputElement = <textarea 
            className={classes.join(' ')}
            {...props.elementConfig} 
            onChange={props.changed}/>;
            break;
        default:
            inputElement = <input 
            className={classes.join(' ')}
            {...props.elementConfig} 
            onChange={props.changed}/>;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>

    );
}

export default input;