import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
import { Middleware, Action } from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../reducers/root_reducer'
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
interface sessionAction {
   type: string;
   currentUser?: {
      username: string;
      id: number;
      password?: string;
   };
   errors?: string[];
}
// We'll dispatch this when our user signs in
export const receiveCurrentUser = (
   currentUser: {
      username: string,
      id: number
   }): sessionAction => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// This will be used to redirect the user to the login page upon signup
export const receiveUserSignIn = (): sessionAction=> ({
  type: RECEIVE_USER_SIGN_IN,
});

// We dispatch this one to show authentisessioncation errors on the frontend
export const receiveErrors = (errors:string[]):sessionAction => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// When our user is logged out, we will dispatch this action to set isAuthenticated to false
export const logoutUser = ():sessionAction => ({
  type: RECEIVE_USER_LOGOUT,
});

// Upon signup, dispatch the approporiate action depending on which type of response we receieve from the backend
export const signup = (
   user: {
      username: string,
      id: number,
      password: string
   }):ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch: Middleware | any ) =>
  APIUtil.signup(user).then(
    () => dispatch(receiveUserSignIn()),
    (err) => dispatch(receiveErrors(err.response.data))
  );

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export const login = (
   user: {
      username: string,
      id: number,
      password: string
   }):ThunkAction<void, RootState, unknown, Action<string>>  => (dispatch) =>
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded: {username: string,id: number} = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
// Upon logout, reset session token and remove the current user.
export const logout = ():ThunkAction<void, RootState, unknown, Action<string | boolean>> => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};
