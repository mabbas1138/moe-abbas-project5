import React, { Component } from 'react';
import './Goal.css';
import firebase from '../firebase.js';


class Goal extends Component {
    constructor() {
        super();

        this.state = {
            goal: [],
            userInput: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const databaseRef=firebase.database().ref()
        const goalInfoKey = databaseRef.push(this.state.userInput)
        this.props.updateKey(goalInfoKey.key)
        this.setState({
            userInput:''
        })
    }

    handleChange = (event) => {
        event.preventDefault();
        
        this.setState({
            userInput: event.target.value
        })
    }

    componentDidMount () {
        const databaseRef=firebase.database().ref();

        databaseRef.on('value', response => {
            
            const newGoal = [];

            const data = response.val();

            for (let key in data) {
                newGoal.push({
                    key: key,
                    writtenGoal: data[key]
                })
            }

            this.setState({
                goal: newGoal
            })

        })
    }

    removeGoal = (goalId) => {

        const databaseRef = firebase.database().ref(goalId)
 
        databaseRef.remove();
    }

    render() {
        return (
          <div className="Goal">
            {this.state.goal.map(goalEntry => {
              return (
                <div className="goalText">
                  <h2>Goal:</h2>
                  <p key={goalEntry.id} />
                  <p>{goalEntry.writtenGoal}</p>
                  <button
                    className="deleteButton"
                    onClick={() => this.removeGoal(goalEntry.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}

            <form action="submit" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="enter goal here"
                onChange={this.handleChange}
                name="userInput"
                value={this.state.userInput}
              />
              <label>
                <textarea placeholder="Add your next steps in accomplishing this goal!" onChange={this.handleChange} name="userInput" value={this.state.value} />
              </label>
              <button type="submit">Add Goal</button>
            </form>
          </div>
        );
    }
}

export default Goal;