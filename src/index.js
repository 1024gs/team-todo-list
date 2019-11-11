/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './theme.scss';
import '_/customized-vendors/node-waves/dist/waves.css';
import Waves from '_/customized-vendors/node-waves/src/js/waves.js';

ReactDOM.render(<App />, document.getElementById('root'));
Waves.init({duration: 750, delay: 200});
