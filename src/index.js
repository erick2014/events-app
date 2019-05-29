// @vendors
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// @redux
import { getHistory, getStore } from 'reduxConfig/store';

// @routing
import Routing from './routing';

const store = getStore();
const history = getHistory();

const MyApp = () => (
    <Provider store={store}>
        <Router history={history}>
            <Routing />
        </Router>
    </Provider>
);

// render our App componnet and mount it to our #root element
ReactDOM.render(<MyApp />, document.getElementById('root'));
