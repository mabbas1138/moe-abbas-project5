// import React, { Component } from 'react';

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isBroken: false
//         };
//     }

//     componentDidCatch(error, info) {
//         this.setState({
//             hasError: true
//         });
//     }

//     render() {
//         if (this.state.isBroken) {
//             // You can render any custom fallback UI
//             return <h1 > Something went wrong. < /h1>;
//         }
//         return this.props.children;
//     }
// }