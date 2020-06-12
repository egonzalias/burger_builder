import React from 'react'

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

const modal = props => {

    /*shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== props.show || nextProps.children !== props.children;
    }*/

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    );
}

export default React.memo(modal);