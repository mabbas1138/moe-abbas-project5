import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.isBroken) {
            return <h2>Oh snap! Something went wrong!</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;