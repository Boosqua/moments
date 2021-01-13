import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
    const [data, setData] = React.useState(null);
    const getData = () => {
        fetch('/api')
            .then((result) => result.text())
            .then((res) => setData(res));
    };
    return (_jsx("div", Object.assign({ className: "App" }, { children: _jsxs("header", Object.assign({ className: "App-header" }, { children: [_jsx("img", { src: logo, className: "App-logo", alt: "logo" }, void 0),
                _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.jsx" }, void 0), " and save to reload."] }, void 0),
                _jsx("button", Object.assign({ onClick: getData }, { children: "Click Me For Data" }), void 0), data] }), void 0) }), void 0));
}
export default App;
