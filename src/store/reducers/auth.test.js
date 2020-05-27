import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import authReducer from './auth'
import * as actions from '../actions/actionTypes'

configure({ adapter: new Adapter() });

describe('auth reducer', () => {
    /*it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            token: null,
            userId: null,
            email: null,
            authRedirectPath: '/'
        });
    });*/

    it('should store token upon login', () => {
        expect(authReducer(undefined, {
            type: actions.AUTH_SUCCESS,
            token: 'test-token',
            userId: 'test-userId',
            email: 'test-email'
        })).toEqual({
            loading: false,
            error: null,
            token: 'test-token',
            userId: 'test-userId',
            email: 'test-email',
            authRedirectPath: '/'
        });
    });
});