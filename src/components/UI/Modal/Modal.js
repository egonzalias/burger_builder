import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliar'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

/*const memoFunction = (prevProps,nextProps) => {
    /*
    retorna true si al pasar los nextProps a renderizar retorna
    el mismo resultado que al pasar los prevProps a renderizar,
    de otro modo retorna false
    
    return prevProps.show === nextProps.show && prevProps.children.type === nextProps.children.type;
}*/

class modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className='Modal'
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
            </Aux>
        );
    }
}

export default modal;