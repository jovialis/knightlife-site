import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Styles
import './index.css';

// Imports
import PageLogin from './pages/login/page';
import PageGoogleRedirect from './pages/login/google/redirect/page';

import PageDashboard from './pages/dashboard/page';

import PageDashboardLunch from './pages/dashboard/lunch/page';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/login" component={ PageLogin } />
            <Route path="/login/google/redirect" component={ PageGoogleRedirect } />

            <Route exact path='/dashboard' component={ PageDashboard } />
            <Route exact path='/dashboard/lunch' component={ PageDashboardLunch } />
        </Switch>
    </Router>,
    document.getElementById('container')
);