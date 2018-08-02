import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

export default class DisplayEmployeeDetails extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(this.props.state === "Loading")
			return <h4>Fetching Employee Details...</h4>
		else if(this.props.state === "Loaded" && this.props.error)
			return <h4>Error in Fetching Employee Details</h4>
		else if(!this.props.details)
			return <h4>{`No Records available with Employee ID ${this.props.employeeId}`}</h4>
        return (
			<div className="employee-detail-wrapper">
				<h4>{`Details for Employee # ${this.props.employeeId}`} </h4>
				<div className="employee-details">
					<h5> Employee Details</h5>
					<div>
						<label>Name : </label>
						<label>{`${this.props.details.firstName} ${this.props.details.lastName}`}</label>
					</div>
                    <div>
						<label>Email : </label>
						<label>{this.props.details.email}</label>
					</div>
                    <h5> Supervisor Details</h5>
                    <div>
						<label>Name : </label>
						<label>{`${this.props.details.supervisor.firstName} ${this.props.details.supervisor.lastName}`}</label>
					</div>
                    <div>
						<label>Email : </label>
						<label>{this.props.details.supervisor.email}</label>
					</div>
                    <h5> Employer Details</h5>
                    <div>
						<label>Name : </label>
						<label>{this.props.details.employer.employerName}</label>
					</div>
                    <div>
						<label>Division : </label>
						<label>{this.props.details.employer.division}</label>
					</div>
                    <div>
						<label>HeadOffice : </label>
						<label>{this.props.details.employer.employerHeadOffice}</label>
					</div>
                    <h5> Allocated Assets Details</h5>
                    {
                        this.props.details.assetsAllocated.edges.map((asset, index)=>
                        <div key="index">
                        <div>
                            <label>AssetType : </label>
                            <label>{asset.node.assetType}</label>
                        </div>
                        <div>
                            <label>AssetID : </label>
                            <label>{asset.node.assetId}</label>
                        </div>
                        </div>
                        )
                    }
				</div>
			</div>
		);
	}
}
