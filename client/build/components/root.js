import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';
const Root = ({ store }) => {
    return (_jsx(Provider, Object.assign({ store: store }, { children: _jsx(HashRouter, { children: _jsx(App, {}, void 0) }, void 0) }), void 0));
};
export default Root;
