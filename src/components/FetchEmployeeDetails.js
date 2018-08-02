import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DisplayEmployeeDetails from './display-employee-details';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';

export default class FetchEmployeeDetails extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let FetchEmployeeDetailsQuery = graphql`
			query FetchEmployeeDetailsQuery($employeeId : Int!) {
				employeeDetail(employeeId: $employeeId) {
					id
					firstName
					lastName
					email
					supervisor {
						firstName
						lastName
						email
					}
					employer {
						employerName
						employerHeadOffice
						division
					}
					assetsAllocated {
						edges {
							node {
								id
								assetId
								assetType
							}
						}
					}
				}
			}
		`;
		return (
			<QueryRenderer
				environment={environment}
				query={FetchEmployeeDetailsQuery}
				variables={{
					employeeId: this.props.employeeId
				}}
				cacheConfig = {{force: false}}
				render={({ error, props }) => {
					if (props) {
						return <DisplayEmployeeDetails state="Loaded" employeeId= {this.props.employeeId} details = {props.employeeDetail}/>;
					} else if (error) {
						<DisplayEmployeeDetails error={error} state="Loaded" employeeId= {this.props.employeeId}/>;
					} else {
						return <DisplayEmployeeDetails state="Loading" />;
					}
				}}
			/>
		);
	}
}
