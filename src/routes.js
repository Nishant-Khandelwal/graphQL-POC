import React from 'react';
import Main from './main.js';
import { Route, Router ,browserHistory } from 'react-router';
import HomePage from './components/HomePage';

export default function () {
    return (
        <Router history={browserHistory} >
            <Route path="/" component={Main}>
                <Route path="/home" component={HomePage} />
                <Route component={NoMatch} />
            </Route>
        </Router>
    );
}

const NoMatch = ({ location }) => (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
