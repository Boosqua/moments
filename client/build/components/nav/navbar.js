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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Grid, ButtonGroup, Button, createMuiTheme, ThemeProvider, makeStyles, Drawer } from '@material-ui/core';
import LoginForm from '../session/login_form_container';
import SignUpForm from '../session/signup_form_container';
import Profile from '../profile/profile_container';
import { Link, useRouteMatch, useHistory, } from "react-router-dom";
var theme = createMuiTheme({
    typography: {
        fontFamily: "'Playfair Display', serif",
        button: {
            fontSize: '25px',
            height: "30px",
            padding: "10px",
            margin: "0px",
        }
    }
});
var useStyles = makeStyles(function (theme) { return ({
    button: {
        padding: 10,
        margin: 0,
        display: 'flex',
    },
    grid: {
        height: 50
    },
    modal: {
        display: "flex",
        flexDirection: "row-reverse",
    }
}); });
//this is a monster that needs to be reworked
//I used this component to learn material ui and some hooks
function NavBar(props) {
    var style = useStyles();
    var path = useRouteMatch().path;
    var history = useHistory();
    var handleOnClick = useCallback(function () { return history.push('/'); });
    useEffect(function () {
        // need to rework waaaay to many db queries
        var userId = props.user ? props.user.id : 0;
        props.fetchAllAlbums({ userId: userId });
    });
    var sessionModal = (path === '/login' || path === "/signup");
    var profileModal = (path === '/@me'); //huge issue if someone hits profile they get redirected
    var form;
    function options() {
        return !props.loggedIn ?
            (_jsxs(Grid, __assign({ container: true, item: true, xs: 3, spacing: 0, alignItems: "center", justify: "center" }, { children: [_jsxs(ButtonGroup, __assign({ variant: "contained", size: "medium", disableElevation: true }, { children: [_jsx(Link, __assign({ to: "/login", style: { textDecoration: "none" } }, { children: _jsx(Button, __assign({ type: "button", className: style.button }, { children: "Log In" }), void 0) }), void 0),
                            _jsx(Link, __assign({ to: "/signup", style: { textDecoration: "none" } }, { children: _jsx(Button, __assign({ type: "button", className: style.button }, { children: "Sign Up" }), void 0) }), void 0)] }), void 0),
                    _jsx(Drawer, __assign({ anchor: "right", open: openModal, SlideProps: { in: openModal, direction: "right" }, onClose: handleOnClick, className: style.modal }, { children: form }), void 0)] }), void 0)) :
            (_jsxs(Grid, __assign({ container: true, item: true, xs: 4, spacing: 1, alignItems: "center", justify: "center" }, { children: [_jsxs(ButtonGroup, __assign({ variant: "contained", size: "medium", disableElevation: true }, { children: [_jsx(Link, __assign({ to: "/@me/albums", style: { textDecoration: "none" } }, { children: _jsx(Button, __assign({ type: "button", className: style.button }, { children: "My Albums" }), void 0) }), void 0),
                            _jsx(Link, __assign({ to: "/signup", style: { textDecoration: "none" } }, { children: _jsx(Button, __assign({ type: "button", className: style.button }, { children: "Home" }), void 0) }), void 0),
                            _jsx(Link, __assign({ to: "/@me", style: { textDecoration: "none" } }, { children: _jsx(Button, __assign({ type: "button", className: style.button }, { children: "profile" }), void 0) }), void 0)] }), void 0),
                    _jsx(Drawer, __assign({ anchor: "right", open: openProfile, SlideProps: { in: openProfile, direction: "right" }, onClose: handleOnClick, className: style.modal }, { children: _jsx(Profile, {}, void 0) }), void 0)] }), void 0));
    }
    if (path === '/login') {
        form = _jsx(LoginForm, {}, void 0);
    }
    else {
        form = _jsx(SignUpForm, {}, void 0);
    }
    var _a = useState(sessionModal), openModal = _a[0], setModal = _a[1];
    var _b = useState(profileModal), openProfile = _b[0], setProfile = _b[1];
    useEffect(function () {
        setModal(path === '/login' || path === "/signup");
        setProfile(path === '/@me');
    });
    return (_jsx(ThemeProvider, __assign({ theme: theme }, { children: _jsx("div", __assign({ className: "nav-bar" }, { children: _jsxs(Grid, __assign({ container: true, direction: 'row', justify: "space-between", alignContent: "center", alignItems: "center", space: 1, className: style.grid }, { children: [_jsx(Grid, __assign({ container: true, item: true, sm: 3, alignItems: "center", justify: "center" }, { children: _jsx("p", __assign({ style: { fontFamily: "'Playfair Display', serif", fontSize: "30px" } }, { children: "Photo Dojo" }), void 0) }), void 0), options()] }), void 0) }), void 0) }), ""));
}
export default NavBar;
