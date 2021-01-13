import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, } from "../actions/session_actions";
const initialState = {
    isAuthenticated: false,
    user: {},
};
export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign(Object.assign({}, state), { isAuthenticated: !!action.currentUser, user: action.currentUser });
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: {},
            };
        case RECEIVE_USER_SIGN_IN:
            return Object.assign(Object.assign({}, state), { isSignedIn: true });
        default:
            return state;
    }
}
