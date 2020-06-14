import { useState, useEffect } from 'react'

export default httpCliente => {

    const [error, setError] = useState();

    const errorConfirmHandler = () => {
        setError(null);
    }

    const reqInterceptor = httpCliente.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = httpCliente.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpCliente.interceptors.request.eject(reqInterceptor);
            httpCliente.interceptors.request.eject(resInterceptor);
        };
    }, [httpCliente.interceptors.request, reqInterceptor, resInterceptor]);

    return [error, errorConfirmHandler];
}