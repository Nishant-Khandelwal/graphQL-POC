import { commitMutation, graphql } from 'react-relay';
import environment from '../Environment';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
	mutation GetEmployeeDetailsMutation($input: getEmployeeDetailsInput!) {
		getEmployeeDetails(input: $input) {
			employee{
			firstName,
			lastName,
			email,
			supervisor {
				firstName,
				lastName,
				email
			}
			employer {
				employerName,
				employerHeadOffice,
				division
			},
			assetsAllocated {
				edges {
				node {
					id,
					assetId,
					assetType
				}
				}
			}
    	}
		}
	}
`;
export function GetEmployeeDetailsMutation(employeeId, viewerID, callback) {
	const variables = {
		input: {
			employeeId,
			clientMutationId: ''
		}
	};
	commitMutation(environment, {
		mutation,
		variables,
		onCompleted: (response) => {
			callback(response);
		},
		onError: (err) => console.error(err)
	});
}
