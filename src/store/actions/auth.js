import * as actionTypes from './actionTypes'
import axios from '../../net/axio-orders'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    const token = authData.idToken;
    const userId = authData.localId;
    const email = authData.email;
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        email: email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogut());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const API_KEY = 'AIzaSyAPaIr4mnDnvyS73POZiYC4wnqsv6vHK-w';
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        if (isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        }

        axios.post(url + API_KEY, authData)
            .then(response => {
                const expiresIn = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('expiresIn', expiresIn);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const authSetRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogut());
        }
        else {
            const expiresIn = new Date(localStorage.getItem('expiresIn'));
            if (expiresIn <= new Date()) {
                dispatch(authLogut());
            }
            else {
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                const authData = {
                    idToken: token,
                    localId: userId,
                    email: email
                }
                dispatch(authSuccess(authData));
                dispatch(checkAuthTimeout((expiresIn.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}