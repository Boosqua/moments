import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStyles } from '../session/session_form';
import { Container, Typography, Button } from '@material-ui/core';
//this will house access to update methods for user profile, link to liked images, allow single image uploads to public library, etc
export default function Profile(props) {
    const style = useStyles();
    return (_jsxs(Container, Object.assign({ className: style.container }, { children: [_jsx(Typography, Object.assign({ variant: "h6", className: style.header, style: { fontSize: "40px" } }, { children: `Welcome Back ${props.user.username}!` }), void 0),
            _jsx(Button, Object.assign({ className: style.button, onClick: props.logout }, { children: "Logout?" }), void 0)] }), void 0));
}
