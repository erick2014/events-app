// @vendors
import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

// @components
const LoginComponent = loadable(() => import('./app/components/login'));

// const SignUpComponent = loadable(() => import('./app/components/signup'));
// import Dashboard from 'components/dashboard/dashboard'
// import DashboardEventDetail from 'components/dashboard/dashboard.event.edit/dashboard.event.edit.jsx'
// import DashboardEventNew from 'components/dashboard/dashboard.event.new/dashboard.event.new'
// import DashboardEventEdit from 'components/dashboard/dashboard.event.edit/dashboard.event.edit'

const Routing = () => (
    <div>
        <Route exact path="/" render={() => <LoginComponent />} />
        <Route path="/login" render={() => <LoginComponent />} />
        {/* <Route path='/signup' component={SignUpComponent} />
         <Route path='/dashboard' component={Dashboard} />
         <Route path='/event-detail/:id' component={DashboardEventDetail} />
         <Route path='/event-new/' component={DashboardEventNew} />
         <Route path='/event-edit/:id' component={DashboardEventEdit} />  */}
    </div>
);

export default Routing;
