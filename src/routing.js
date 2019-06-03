// @vendors
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

// @components
const Login = loadable(() => import('./app/components/login'));
const SignUp = loadable(() => import('./app/components/signup'));
const Dashboard = loadable(() => import('./app/components/dashboard'));

const Routing = props => (
    <Fragment>
        <Route exact path="/" render={() => <Login />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/signup" render={() => <SignUp />} />
        <Route path="/dashboard" render={() => <Dashboard {...props} />} />
    </Fragment>
);

export default Routing;
