import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, withRouter, useRouteMatch } from "react-router-dom";
import { Container, makeStyles, Typography, Button } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
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
}));
function LoginForm(props) {
    let style = useStyles();
    let { path } = useRouteMatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleInput = (cb) => {
        return (e) => {
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
    return (_jsxs(Container, Object.assign({ className: style.container }, { children: [_jsx(Typography, Object.assign({ variant: "h6", className: style.header }, { children: path === "/login" ?
                    "Welcome Back" :
                    "Register" }), void 0),
            _jsxs("form", Object.assign({ onSubmit: () => {
                    let user = {
                        username: username,
                        password: password
                    };
                    props.formType(user).then(() => {
                        if (props.type === 'signup') { // spaghetti code since I forgot to get jwt passport to work on backend signup
                            props.login(user);
                        }
                    });
                    setPassword('');
                }, style: { fontSize: "8px" } }, { children: [_jsx("input", { type: "text", value: username, onChange: handleInput(setUsername), placeholder: "Username", className: "sessionInput" }, void 0),
                    _jsx("br", {}, void 0),
                    _jsx("input", { type: "password", className: "sessionInput", value: password, onChange: handleInput(setPassword), placeholder: "Password" }, void 0),
                    _jsx("br", {}, void 0),
                    _jsx(Link, Object.assign({ className: "session-links", to: path === "/login" ?
                            "/signup" :
                            "/login" }, { children: path === "/login" ?
                            "Need an account?" :
                            "Already have an account?" }), void 0),
                    _jsx(Button, Object.assign({ type: 'submit', className: style.button }, { children: "submit" }), void 0)] }), void 0)] }), void 0));
}
export const SessionForm = withRouter(LoginForm);
