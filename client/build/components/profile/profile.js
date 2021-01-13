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
import { useStyles } from '../session/session_form';
import { Container, Typography, Button } from '@material-ui/core';
//this will house access to update methods for user profile, link to liked images, allow single image uploads to public library, etc
export default function Profile(props) {
    var style = useStyles();
    return (_jsxs(Container, __assign({ className: style.container }, { children: [_jsx(Typography, __assign({ variant: "h6", className: style.header, style: { fontSize: "40px" } }, { children: "Welcome Back " + props.user.username + "!" }), void 0),
            _jsx(Button, __assign({ className: style.button, onClick: props.logout }, { children: "Logout?" }), void 0)] }), void 0));
}
