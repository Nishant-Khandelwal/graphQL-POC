import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLList } from 'graphql';

import {
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	connectionFromPromisedArray,
	fromGlobalId,
	globalIdField,
	nodeDefinitions,
	mutationWithClientMutationId,
	toGlobalId
} from 'graphql-relay';

import {
	Viewer,
	getViewer,
	Employee,
	getEmployees,
	getEmployee,
	Employer,
	getEmployer,
	Asset,
	getAllocatedAssetsList,
	getAllEmployeesForEmployer,
	addNewEmployee
} from './database';
const _ = require('lodash');

const { nodeInterface, nodeField } = nodeDefinitions(
	(globalId) => {
		const { type, id } = fromGlobalId(globalId);
		if (type === 'Viewer') {
			console.log('type and id', { type, id });
			return getViewer();
		}
		if (type === 'Employee') {
			console.log('type and id', { type, id });
			return getEmployee(id);
		} else if (type === 'Employer') {
			console.log('type and id', { type, id });
			return getEmployer(id);
		} else if (type === 'Asset') {
			console.log('type and id', { type, id });
			return getAsset(id);
		}
		return null;
	},
	(obj) => {
		if (obj instanceof Employee) {
			console.log('Employee obj>>>', obj);
			return employeeType;
		} else if (obj instanceof Employer) {
			console.log('Employer obj>>>', obj);
			return employerType;
		} else if (obj instanceof Employer) {
			console.log('Asset obj>>>', obj);
			return assetType;
		} else if (obj instanceof Viewer) {
			console.log('Asset obj>>>', obj);
			return viewerType;
		}
		return null;
	}
);

const employeeType = new GraphQLObjectType({
	name: 'Employee',
	fields: () => ({
		id: globalIdField('Employee'),
		// employeeId: {
		//     type: GraphQLString
		// },
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		gender: {
			type: GraphQLString
		},
		supervisor: {
			type: employeeType,
			description: 'Details of SuperVisor',
			resolve: (employeeObj, args, context) => {
				return getEmployee(employeeObj.supervisorId);
			}
		},
		assetsAllocated: {
			type: assetsConnection,
			description: 'List of Allocated Assets',
			args: connectionArgs,
			resolve: (employeeObj, args, context) => {
				return connectionFromArray(getAllocatedAssetsList(employeeObj.assetsAllocated), args);
			}
		},
		employer: {
			type: employerType,
			description: 'Details of the employer',
			resolve: (employeeObj, args, context) => {
				return getEmployer(employeeObj.employer);
			}
		},
		email: {
			type: GraphQLString
		}
	}),
	interface: [ nodeInterface ]
});

const assetType = new GraphQLObjectType({
	name: 'Asset',
	description: 'asset details',
	fields: () => ({
		id: globalIdField('Asset'),
		assetId: {
			type: GraphQLString
		},
		assetType: {
			type: GraphQLString
		},
		issuedTo: {
			type: employeeType,
			description: 'Details of Employee for this asset',
			resolve: (assetObj, args, context) => {
				return getEmployee(assetObj.issuedTo);
			}
		}
	}),
	interface: [ nodeInterface ]
});

const employerType = new GraphQLObjectType({
	name: 'Employer',
	description: 'employer details',
	fields: () => ({
		id: globalIdField('Employer'),
		employerId: {
			type: GraphQLString
		},
		employerName: {
			type: GraphQLString
		},
		division: {
			type: GraphQLString
		},
		employerHeadOffice: {
			type: GraphQLString
		},
		employees: {
			type: employeeConnection,
			description: 'List of Employees',
			args: connectionArgs,
			resolve: (employerObj, args, context) => {
				return connectionFromArray(getAllEmployeesForEmployer(employerObj.employees), args);
			}
		}
	}),
	interface: [ nodeInterface ]
});

const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'List of Employees',
	fields: () => ({
		id: globalIdField('Viewer'),
		employees: {
			type: employeeConnection,
			description: 'List of Employees',
			args: connectionArgs,
			resolve: (listObj, args, context) => {
				return connectionFromPromisedArray(context.employeesLoader.load('employees'), args);
			}
		}
	}),
	interfaces: [ nodeInterface ]
});

const { connectionType: employeeConnection } = connectionDefinitions({ name: 'Employee', nodeType: employeeType });
const { connectionType: assetsConnection } = connectionDefinitions({ name: 'Asset', nodeType: assetType });

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		node: nodeField,
		employeeList: {
			type: viewerType,
			resolve: () => getViewer()
		},
		employerList: {
			type: new GraphQLList(employerType),
			resolve: (_, args, context) => context.employersLoader.load('employers')
		},
		assetsList: {
			type: new GraphQLList(assetType),
			resolve: (_, args, context) => context.assetsLoader.load('assets')
		},
		employeeDetail: {
			args: {
				employeeId: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			type: employeeType,
			resolve: (_, { employeeId }, context) => getEmployee(employeeId)
		}
	})
});
const GraphQLGetEmployeeMutation = mutationWithClientMutationId({
	name: 'getEmployeeDetails',
	inputFields: {
		employeeId: { type: new GraphQLNonNull(GraphQLInt) }
	  },
	  outputFields: {
		employee: {
		  type: employeeType,
		  resolve: ({ details }) => {
			  return details
			}
		}
	},
	mutateAndGetPayload: ({employeeId}) => {
		const details = getEmployee(employeeId)
		return {details};
	  },
});
const GraphQLAddEmployeeMutation = mutationWithClientMutationId({
	name: 'addEmployeeDetails',
	inputFields: {
		employeeId: { type: new GraphQLNonNull(GraphQLInt) },
		firstName: {type: GraphQLString},
		lastName:{type: GraphQLString},
        gender: {type: GraphQLString},
        email: {type: GraphQLString},
        supervisorId: {type: new GraphQLNonNull(GraphQLID)}
	  },
	  outputFields: {
		employee: {
		  type: employeeType,
		  resolve: ({details}, _ , context) => {
			  context.employeesLoader.clear('employees');
			  return details
			}
		}
	},
	mutateAndGetPayload: ({employeeId, firstName, lastName, gender, email, supervisorId}) => {
		return addNewEmployee({employeeId,firstName,lastName,gender,email,supervisorId}).then(()=>{
				const details = getEmployee(employeeId)
				return {details};
			},()=> console.log("Error in updating the record"))
		
	  },
});
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
	  getEmployeeDetails: GraphQLGetEmployeeMutation,
	  addEmployeeDetails: GraphQLAddEmployeeMutation
	},
  });

  
export const schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});
