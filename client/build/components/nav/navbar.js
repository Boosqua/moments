import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { Grid, ButtonGroup, Button, createMuiTheme, ThemeProvider, makeStyles, Drawer } from '@material-ui/core';
import LoginForm from '../session/login_form_container';
import SignUpForm from '../session/signup_form_container';
import Profile from '../profile/profile_container';
import { Link, useRouteMatch, useHistory, } from "react-router-dom";
const theme = createMuiTheme({
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
const useStyles = makeStyles((theme) => ({
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
}));
//this is a monster that needs to be reworked
//I used this component to learn material ui and some hooks
function NavBar(props) {
    let style = useStyles();
    let { path } = useRouteMatch();
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/'));
    useEffect(() => {
        // need to rework waaaay to many db queries
        let userId = props.user ? props.user.id : 0;
        props.fetchAllAlbums({ userId: userId });
    });
    let sessionModal = (path === '/login' || path === "/signup");
    let profileModal = (path === '/@me'); //huge issue if someone hits profile they get redirected
    let form;
    function options() {
        return !props.loggedIn ?
            (_jsxs(Grid, Object.assign({ container: true, item: true, xs: 3, spacing: 0, alignItems: "center", justify: "center" }, { children: [_jsxs(ButtonGroup, Object.assign({ variant: "contained", size: "medium", disableElevation: true }, { children: [_jsx(Link, Object.assign({ to: `/login`, style: { textDecoration: "none" } }, { children: _jsx(Button, Object.assign({ type: "button", className: style.button }, { children: "Log In" }), void 0) }), void 0),
                            _jsx(Link, Object.assign({ to: `/signup`, style: { textDecoration: "none" } }, { children: _jsx(Button, Object.assign({ type: "button", className: style.button }, { children: "Sign Up" }), void 0) }), void 0)] }), void 0),
                    _jsx(Drawer, Object.assign({ anchor: "right", open: openModal, SlideProps: { in: openModal, direction: "right" }, onClose: handleOnClick, className: style.modal }, { children: form }), void 0)] }), void 0)) :
            (_jsxs(Grid, Object.assign({ container: true, item: true, xs: 4, spacing: 1, alignItems: "center", justify: "center" }, { children: [_jsxs(ButtonGroup, Object.assign({ variant: "contained", size: "medium", disableElevation: true }, { children: [_jsx(Link, Object.assign({ to: `/@me/albums`, style: { textDecoration: "none" } }, { children: _jsx(Button, Object.assign({ type: "button", className: style.button }, { children: "My Albums" }), void 0) }), void 0),
                            _jsx(Link, Object.assign({ to: `/signup`, style: { textDecoration: "none" } }, { children: _jsx(Button, Object.assign({ type: "button", className: style.button }, { children: "Home" }), void 0) }), void 0),
                            _jsx(Link, Object.assign({ to: `/@me`, style: { textDecoration: "none" } }, { children: _jsx(Button, Object.assign({ type: "button", className: style.button }, { children: "profile" }), void 0) }), void 0)] }), void 0),
                    _jsx(Drawer, Object.assign({ anchor: "right", open: openProfile, SlideProps: { in: openProfile, direction: "right" }, onClose: handleOnClick, className: style.modal }, { children: _jsx(Profile, {}, void 0) }), void 0)] }), void 0));
    }
    if (path === '/login') {
        form = _jsx(LoginForm, {}, void 0);
    }
    else {
        form = _jsx(SignUpForm, {}, void 0);
    }
    const [openModal, setModal] = useState(sessionModal);
    const [openProfile, setProfile] = useState(profileModal);
    useEffect(() => {
        setModal(path === '/login' || path === "/signup");
        setProfile(path === '/@me');
    });
    return (_jsx(ThemeProvider, Object.assign({ theme: theme }, { children: _jsx("div", Object.assign({ className: "nav-bar" }, { children: _jsxs(Grid, Object.assign({ container: true, direction: 'row', justify: "space-between", alignContent: "center", alignItems: "center", space: 1, className: style.grid }, { children: [_jsx(Grid, Object.assign({ container: true, item: true, sm: 3, alignItems: "center", justify: "center" }, { children: _jsx("p", Object.assign({ style: { fontFamily: "'Playfair Display', serif", fontSize: "30px" } }, { children: "Photo Dojo" }), void 0) }), void 0), options()] }), void 0) }), void 0) }), ""));
}
export default NavBar;
