import React, { Component } from 'react';
import EmployeesList from './EmployeesList';
import { QueryRenderer, createFragmentContainer, graphql } from 'react-relay';
import environment from '../Environment';

const EmployeesPageQuery = graphql`
    query EmployeesPageQuery {
        employeeList {
            id,
            ...EmployeesList_employeesList
        }
    }`

export default class EmployeesPage extends Component {
    render() {
        return(
            <QueryRenderer
            environment={environment}
            query={EmployeesPageQuery}
            variables={{
                employeeId: this.props.employeeId
            }}
            render={({ error, props }) => {
                if (props) {
                    return <EmployeesList employeesList = {props.employeeList}/>;
                } else if (error) {
                    return <h1>Error in Loading</h1>
                } else {
                   return  <h1>Loading...</h1>
                }
            }}
        />
        )
    }
}
