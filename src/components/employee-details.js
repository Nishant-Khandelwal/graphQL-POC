import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';
import { withRouter, Link } from 'react-router-dom';
import { GetEmployeeDetailsMutation } from '../mutations/GetEmployeeDetailsMutation';
import FetchEmployeeDetails from './FetchEmployeeDetails';
import axios from "axios";
import _ from "lodash";
const restEndPoint = "http://localhost:3000/";

class EmployeeDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeId: '',
			loadEmployeDetails : false
		};
	}
	getDetailsUsingGraph() {
		this.setState({
			employeeId: document.getElementsByName('employeeId')[0].value,
			loadEmployeDetails: true
		})
	}
	render() {
		return (
			<div className="form-wrapper">
			<h3>Get Employee Details</h3>
				<div className="graphQL-form-wrapper">
					<input
						type="text"
						placeholder="enter employee ID"
						name="employeeId"
					/>
					<button type="submit" value="Submit" onClick={this.getDetailsUsingGraph.bind(this)}>
						Fetch Details
					</button>
				</div>
				<div>
					{this.state.loadEmployeDetails && (
						<FetchEmployeeDetails
							employeeId={this.state.employeeId}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(EmployeeDetails);
