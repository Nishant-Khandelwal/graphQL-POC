import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import DisplayEmployeeDetails from './display-employee-details';

class Employee extends Component {
    render() {
        return (
         <div className="employee-detail-wrapper">
            <div className="employee-details">
                <h5> Employee Details</h5>
                <div>
                    <label>Name : </label>
                    <label>{`${this.props.employee.firstName} ${this.props.employee.lastName}`}</label>
                </div>
                <div>
                    <label>Email : </label>
                    <label>{this.props.employee.email}</label>
                </div>
                <h5> Supervisor Details</h5>
                <div>
                    <label>Name : </label>
                    <label>{`${this.props.employee.supervisor.firstName} ${this.props.employee.supervisor.lastName}`}</label>
                </div>
                <div>
                    <label>Email : </label>
                    <label>{this.props.employee.supervisor.email}</label>
                </div>
            </div>
        </div>	
		);
	}
}

export default createFragmentContainer(Employee, graphql`
		fragment Employee_employee on Employee {
			id
			firstName
			lastName
            email
			supervisor {
				id
				firstName
				lastName
                email
			}
		}
	`);
