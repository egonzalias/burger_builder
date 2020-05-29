import { takeEvery, all } from 'redux-saga/effects';
import { authLogutSaga, checkAuthTimeoutSaga, authSaga, authCheckStateSaga } from './auth'
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    /*yield takeEvery(actionTypes.AUTH_START_LOGOUT, authLogutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH, authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);*/
    //It's other way to use multiple yield, and we can use in sagas functions
    //it's allows run multiples taks simultaneously
    yield all([
        takeEvery(actionTypes.AUTH_START_LOGOUT, authLogutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH, authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}