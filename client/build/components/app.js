import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import MainPage from "./main/main_page";
import Albums from './album_crud/album_container';
const theme = createMuiTheme({
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
// need to rework routes
const App = () => (_jsx("div", { children: _jsx(CssBaseline, { children: _jsx(ThemeProvider, Object.assign({ theme: theme }, { children: _jsxs(Switch, { children: [_jsx(Route, { exact: true, path: "/", component: MainPage }, void 0),
                    _jsx(AuthRoute, { exact: true, path: "/login", component: MainPage }, void 0),
                    _jsx(AuthRoute, { exact: true, path: "/signup", component: MainPage }, void 0),
                    _jsx(ProtectedRoute, { exact: true, path: "/@me", component: MainPage }, void 0),
                    _jsx(ProtectedRoute, { exact: true, path: '/@me/albums', component: Albums }, void 0)] }, void 0) }), void 0) }, void 0) }, void 0));
export default App;
