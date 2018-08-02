import React from 'react';

class Main extends React.Component {
    constructor(props) {
            super(props);
    }
    render() {
        return (
            <div>
                <h1>GraphQL and React POC</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Main;