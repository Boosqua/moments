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
import { useState } from 'react';
import { Link, withRouter, useRouteMatch } from "react-router-dom";
import { Container, makeStyles, Typography, Button } from '@material-ui/core';
export var useStyles = makeStyles(function (theme) { return ({
    container: {
        background: '#0077b6',
        maxWidth: '500px',
        height: "inherit"
    },
    header: {
        fontSize: "50px",
        marginTop: "10px",
        marginBottom: "10px",
    },
    button: {
        width: "450px",
        height: "50px",
        marginTop: "20px"
    }
}); });
function LoginForm(props) {
    var style = useStyles();
    var path = useRouteMatch().path;
    var _a = useState(''), username = _a[0], setUsername = _a[1];
    var _b = useState(''), password = _b[0], setPassword = _b[1];
    var handleInput = function (cb) {
        return function (e) {
            cb(e.currentTarget.value);
        };
    };
    //errors code will be usable one day :D
    // Render the session errors if there are any 
    // const renderErrors = () => {
    //    return(
    //          <ul>
    //          {Object.keys(this.state.errors).map((error, i) => (
    //             <li key={`error-${i}`}>
    //                {this.state.errors[error]}
    //             </li>
    //          ))}
    //          </ul>
    //       );
    // }
    return (_jsxs(Container, __assign({ className: style.container }, { children: [_jsx(Typography, __assign({ variant: "h6", className: style.header }, { children: path === "/login" ?
                    "Welcome Back" :
                    "Register" }), void 0),
            _jsxs("form", __assign({ onSubmit: function () {
                    var user = {
                        username: username,
                        password: password
                    };
                    props.formType(user).then(function () {
                        if (props.type === 'signup') { // spaghetti code since I forgot to get jwt passport to work on backend signup
                            props.login(user);
                        }
                    });
                    setPassword('');
                }, style: { fontSize: "8px" } }, { children: [_jsx("input", { type: "text", value: username, onChange: handleInput(setUsername), placeholder: "Username", className: "sessionInput" }, void 0),
                    _jsx("br", {}, void 0),
                    _jsx("input", { type: "password", className: "sessionInput", value: password, onChange: handleInput(setPassword), placeholder: "Password" }, void 0),
                    _jsx("br", {}, void 0),
                    _jsx(Link, __assign({ className: "session-links", to: path === "/login" ?
                            "/signup" :
                            "/login" }, { children: path === "/login" ?
                            "Need an account?" :
                            "Already have an account?" }), void 0),
                    _jsx(Button, __assign({ type: 'submit', className: style.button }, { children: "submit" }), void 0)] }), void 0)] }), void 0));
}
export var SessionForm = withRouter(LoginForm);
