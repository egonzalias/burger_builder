import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: null,
    token: null,
    userId: null,
    email: null,
    authRedirectPath: '/' //Save the path, if come from burgerbuild without is auth, then save '/checkout'.
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                userId: action.userId,
                email: action.email,
                error: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                error: action.error,
                token: null,
                userId: null,
                email: null
            }
        case actionTypes.AUTH_SET_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath: action.path
            }
        default: return state;
    }

}

export default reducer;