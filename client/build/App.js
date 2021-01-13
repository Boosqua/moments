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
import React from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
    var _a = React.useState(null), data = _a[0], setData = _a[1];
    var getData = function () {
        fetch('/api')
            .then(function (result) { return result.text(); })
            .then(function (res) { return setData(res); });
    };
    return (_jsx("div", __assign({ className: "App" }, { children: _jsxs("header", __assign({ className: "App-header" }, { children: [_jsx("img", { src: logo, className: "App-logo", alt: "logo" }, void 0),
                _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.jsx" }, void 0), " and save to reload."] }, void 0),
                _jsx("button", __assign({ onClick: getData }, { children: "Click Me For Data" }), void 0), data] }), void 0) }), void 0));
}
export default App;
