import { delay, put, call } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from '../../net/axio-orders'

export function* authLogutSaga(action){
    /*yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expiresIn');
    yield localStorage.removeItem('email');*/
    //CALL - is other way to call diferents functions, it allow us test our generators
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "userId");
    yield call([localStorage, 'removeItem'], "expiresIn");
    yield call([localStorage, 'removeItem'], "email");
    yield put(actions.authLogutSuccessful());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.authLogut());
}

export function* authSaga(action){
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    const API_KEY = 'AIzaSyAPaIr4mnDnvyS73POZiYC4wnqsv6vHK-w';
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    if (action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    }

    try{
        const response = yield axios.post(url + API_KEY, authData);
        const expiresIn = yield new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        yield localStorage.setItem('email', response.data.email);
        yield localStorage.setItem('expiresIn', expiresIn);
        yield put(actions.authSuccess(response.data));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }catch(error){
        yield put (actions.authFail(error.response.data.error.message));
    }
}

export function* authCheckStateSaga(action){

    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.authLogut());
    }
    else {
        const expiresIn = yield new Date(localStorage.getItem('expiresIn'));
        if (expiresIn <= new Date()) {
            yield put(actions.authLogut());
        }
        else {
            const userId = yield localStorage.getItem('userId');
            const email = yield localStorage.getItem('email');
            const authData = {
                idToken: token,
                localId: userId,
                email: email
            }
            yield put(actions.authSuccess(authData));
            yield put(actions.checkAuthTimeout((expiresIn.getTime() - new Date().getTime()) / 1000));
        }
    }
}