import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, useRouteMatch } from 'react-router-dom';
import App from './app';

const Root = ({ store }) => {
   return(
  <Provider store={ store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)};

export default Root;