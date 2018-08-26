import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.hydrate(
    <BrowserRouter>
        <Route component={App}/>
    </BrowserRouter>,
    document.getElementById('root')
);
