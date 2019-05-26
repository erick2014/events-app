// @vendors
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StylesProvider } from "@material-ui/styles";

import { getHistory, getStore } from 'reduxConfig/store';
import Routing from './routing';

// import general styles
require('./assets/stylesheets/styles.scss');

const store = getStore();
const history = getHistory();

const MyApp = () => (
    <StylesProvider injectFirst>
        <Provider store={store}>
            <Router history={history}>
                <Routing />
            </Router>
        </Provider>
    </StylesProvider>
);

// render our App componnet and mount it to our #root element
ReactDOM.render(<MyApp />, document.getElementById('root'));
