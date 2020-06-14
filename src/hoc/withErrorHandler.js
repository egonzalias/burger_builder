import React from 'react'

import Aux from './Auxiliar'
import Modal from '../components/UI/Modal/Modal'
import useHttpErrorHandler from '../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {
        const [error, errorConfirmHandler] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={errorConfirmHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;