import React, { Component } from 'react';
import Employee from './Employee';
import { createFragmentContainer, graphql } from 'react-relay';

class EmployeesList extends Component {
	render() {
        return (
			<div>
				<div className="row">
                {this.props.employeesList.employees.edges.map(({node}) => 
                    <Employee key={node.__id} employee = {node} />
                )}
				</div>
			</div>
		);
	}
}

export default createFragmentContainer(EmployeesList, graphql`
        fragment EmployeesList_employeesList on Viewer {
                employees {
                edges {
                    node {
                    ...Employee_employee
                    }
                }
                }
        }`);
