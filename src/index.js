import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Home from './components/HomePage';
import EmployeeDetails from './components/employee-details';
import EmployeesPage from './components/EmployeesPage';

render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/employee" component={EmployeeDetails} />
      <Route exact path="/allEmployees" component={EmployeesPage} />
    </Switch>
  </Router>
  , document.getElementById('root')
);
