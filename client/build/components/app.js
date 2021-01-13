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
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import MainPage from "./main/main_page";
import Albums from './album_crud/album_container';
var theme = createMuiTheme({
    typography: {
        fontFamily: "'Playfair Display', serif",
        button: {
            fontSize: "8px",
            height: "14px",
            padding: "0px",
            margin: "0px",
        },
    },
});
var App = function () { return (_jsx("div", { children: _jsx(CssBaseline, { children: _jsx(ThemeProvider, __assign({ theme: theme }, { children: _jsxs(Switch, { children: [_jsx(Route, { exact: true, path: "/", component: MainPage }, void 0),
                    _jsx(AuthRoute, { exact: true, path: "/login", component: MainPage }, void 0),
                    _jsx(AuthRoute, { exact: true, path: "/signup", component: MainPage }, void 0),
                    _jsx(ProtectedRoute, { exact: true, path: "/@me", component: MainPage }, void 0),
                    _jsx(ProtectedRoute, { exact: true, path: '/@me/albums', component: Albums }, void 0)] }, void 0) }), void 0) }, void 0) }, void 0)); };
export default App;
