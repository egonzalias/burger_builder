import React, { useState, useEffect } from 'react'

import Aux from './Auxiliar'
import Modal from '../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {

        const [error, setError] = useState();

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.request.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);


        const errorConfirmHandler = () => {
            setError(null);
        }

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