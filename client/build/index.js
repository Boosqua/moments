import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
// We will create this component shortly
import Root from "./components/root";
// We set this up in the last section
import configureStore from "./store/store";
// We will use this to parse the user's session token
import jwt_decode from "jwt-decode";
// The session utility we just created
import { setAuthToken } from "./util/session_api_util";
// We have not created this action yet, but will do so in the next step
import { logout } from './actions/session_actions';
document.addEventListener('DOMContentLoaded', function () {
    var store;
    // If a returning user has a session token stored in localStorage
    if (localStorage.jwtToken) {
        // Set the token as a common header for all axios requests
        setAuthToken(localStorage.jwtToken);
        // Decode the token to obtain the user's information
        var decodedUser = jwt_decode(localStorage.jwtToken);
        // Create a preconfigured state we can immediately add to our store
        var preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
        store = configureStore(preloadedState);
        var currentTime = Date.now() / 1000;
        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
            // Logout the user and redirect to the login page
            store.dispatch(logout());
            window.location.href = '/login';
        }
    }
    else {
        // If this is a first time user, start with an empty store
        store = configureStore({});
    }
    // Render our root component and pass in the store as a prop
    var root = document.getElementById('root');
    ReactDOM.render(_jsx(Root, { store: store }, void 0), root);
});
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();