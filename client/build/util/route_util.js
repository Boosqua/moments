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
var Auth = function (_a) {
    var Component = _a.component, path = _a.path, loggedIn = _a.loggedIn, exact = _a.exact;
    return (_jsx(Route, { path: path, exact: exact, render: function (props) {
            return !loggedIn ? (_jsx(Component, __assign({}, props), void 0)) : (
            // Redirect to the tweets page if the user is authenticated
            _jsx(Redirect, { to: "/" }, void 0));
        } }, void 0));
};
var Protected = function (_a) {
    var Component = _a.component, loggedIn = _a.loggedIn, rest = __rest(_a, ["component", "loggedIn"]);
    return (_jsx(Route, __assign({}, rest, { render: function (props) {
            return loggedIn ? (_jsx(Component, __assign({}, props), void 0)) : (
            // Redirect to the login page if the user is already authenticated
            _jsx(Redirect, { to: "/" }, void 0));
        } }), void 0));
};
// Use the isAuthenitcated slice of state to determine whether a user is logged in
var mapStateToProps = function (state) { return ({
    loggedIn: state.session.isAuthenticated,
}); };
export var AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export var ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));