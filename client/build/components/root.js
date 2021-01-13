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
import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';
var Root = function (_a) {
    var store = _a.store;
    return (_jsx(Provider, __assign({ store: store }, { children: _jsx(HashRouter, { children: _jsx(App, {}, void 0) }, void 0) }), void 0));
};
export default Root;
