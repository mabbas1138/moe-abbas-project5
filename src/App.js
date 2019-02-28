import React, { Component } from 'react';
import './App.css';
// import firebase from './firebase.js';
import Goal from './Goal/Goal.js';
import NextSteps from './NextSteps/NextSteps.js';
// import Deadline from './Deadline/Deadline.js';
// import StartDate from './StartDate/StartDate.js';



class App extends Component {
    constructor() {
        super();
        this.state = {
            key: ''

        }
    }

    updateKey = (key) => {
        this.setState({
            key
        })
    }
  render() {
    return (
      <div className="App">
        <h1>Bucket List</h1>
            <Goal updateKey={this.updateKey}/>
            <NextSteps goalInfoKey={this.state.key}/>
      </div>
    );
  }
}

export default App;

// 1) Create a method on app -- its function is to update the app state with the current firebase key for the goal
// 2) this methods needs to be passed down to goal, so that goal has access to it
// 3) from goal, we need to call update key via props and pass in the firebase key thart's generated during push of the goal
// 4) Pass this.state.key down to next steps and store that key in the button (data attribute)
// 5) on next steps button, use that key to push next steps to corresponding goal