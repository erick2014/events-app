// @vendors
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

// @components
const LoginComponent = loadable(() => import('./app/components/login'));

const Routing = () => (
    <Fragment>
        <Route exact path="/" render={() => <LoginComponent />} />
        <Route path="/login" render={() => <LoginComponent />} />
    </Fragment>
);

export default Routing;
