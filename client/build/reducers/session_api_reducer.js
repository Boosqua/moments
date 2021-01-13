var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_IN, } from "../actions/session_actions";
var initialState = {
    isAuthenticated: false,
    user: {},
};
export default function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return __assign(__assign({}, state), { isAuthenticated: !!action.currentUser, user: action.currentUser });
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: {},
            };
        case RECEIVE_USER_SIGN_IN:
            return __assign(__assign({}, state), { isSignedIn: true });
        default:
            return state;
    }
}
