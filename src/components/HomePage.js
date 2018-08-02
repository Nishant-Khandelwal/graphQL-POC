import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { withRouter, Link } from 'react-router-dom';
import environment from '../Environment';

const HomePageViewerQuery = graphql`
	query HomePageQuery {
		employeeList {
			id
		}
	}
`;

export default class HomePage extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
		<QueryRenderer
			environment={environment}
			query={HomePageViewerQuery}
			variables={{}}
			render={({ error, props }) => {
				if (props) {
					return (
						<div>
							<h1 className="page-heading">GraphQL is Awesome with Relay</h1>
							<nav>
							<Link to={{ pathname:"/employee", query : {viewerId: props.employeeList.id}}} className="navigation-link">
								Get Employee Details
							</Link>
							<Link to={{ pathname:"/allEmployees" }} className="navigation-link">
								Get All Employee
							</Link>
							</nav>
						</div>
					);
				} else if (error) {
					return <h1>Error in Loading Viewer...</h1>;
				} else {
					return <h1>Loading...</h1>;
				}
			}}
		/>
		)
	}
}
