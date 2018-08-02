import React from 'react';
import ReactDOM from 'react-dom';
import { QueryRenderer, graphql } from 'react-relay';
import { installRelayDevTools } from 'relay-devtools';
import 'babel-polyfill/dist/polyfill.min';
import routes from './routes';
import HomePage from './components/home-page.js';
import environment from './Environment';
// Useful for debugging, but remember to remove for a production deploy.
installRelayDevTools();

//React Component Mounting on the element Id > root..
// ReactDOM.render(routes(), document.getElementById('root'));

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			processing: true,
			cancelClicked: false,
			allowRender: false
		};
	}

	render() {
			<QueryRenderer
				environment={environment}
				query={graphql`
					query AppQuery {
						employeeList {
							id
						}
					}
				`}
				variables={{}}
				render={({ error, props }) => {
					if (props) {
						return <HomePage />
					} else if (error) {
						<h1>Error...</h1>;
					} else {
						return <h1>Loading...</h1>;
					}
				}}
			/>
	}
}
export default App;
