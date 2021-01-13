var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (_jsx(Route, { path: path, exact: exact, render: (props) => !loggedIn ? (_jsx(Component, Object.assign({}, props), void 0)) : (
    // Redirect to the tweets page if the user is authenticated
    _jsx(Redirect, { to: "/" }, void 0)) }, void 0));
const Protected = (_a) => {
    var { component: Component, loggedIn } = _a, rest = __rest(_a, ["component", "loggedIn"]);
    return (_jsx(Route, Object.assign({}, rest, { render: (props) => loggedIn ? (_jsx(Component, Object.assign({}, props), void 0)) : (
        // Redirect to the login page if the user is already authenticated
        _jsx(Redirect, { to: "/" }, void 0)) }), void 0));
};
// Use the isAuthenitcated slice of state to determine whether a user is logged in
const mapStateToProps = (state) => ({
    loggedIn: state.session.isAuthenticated,
});
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
