import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
export var RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export var RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export var RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export var RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
// We'll dispatch this when our user signs in
export var receiveCurrentUser = function (currentUser) { return ({
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser,
}); };
// This will be used to redirect the user to the login page upon signup
export var receiveUserSignIn = function () { return ({
    type: RECEIVE_USER_SIGN_IN,
}); };
// We dispatch this one to show authentisessioncation errors on the frontend
export var receiveErrors = function (errors) { return ({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors,
}); };
// When our user is logged out, we will dispatch this action to set isAuthenticated to false
export var logoutUser = function () { return ({
    type: RECEIVE_USER_LOGOUT,
}); };
// Upon signup, dispatch the approporiate action depending on which type of response we receieve from the backend
export var signup = function (user) { return function (dispatch) {
    return APIUtil.signup(user).then(function () { return dispatch(receiveUserSignIn()); }, function (err) { return dispatch(receiveErrors(err.response.data)); });
}; };
// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export var login = function (user) { return function (dispatch) {
    return APIUtil.login(user)
        .then(function (res) {
        var token = res.data.token;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        var decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
    })
        .catch(function (err) {
        dispatch(receiveErrors(err.response.data));
    });
}; };
// Upon logout, reset session token and remove the current user.
export var logout = function () { return function (dispatch) {
    localStorage.removeItem("jwtToken");
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
}; };
