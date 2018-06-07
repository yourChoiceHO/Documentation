/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const root = document.getElementById('root');

ReactDOM.render(<App />, root); // eslint-disable-line react/jsx-filename-extension

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default; // eslint-disable-line global-require
    ReactDOM.render(<NextApp />, root);
  });
}
