import React, { Component } from 'react';
import './NextSteps.css';
import firebase from '../firebase.js';

class NextSteps extends Component {
    constructor() {
        super();
        this.state = {
            nextStep: [],
            userInput: ''
        }
    }

        handleSubmit = (event) => {
            event.preventDefault();
            console.log(this.state.userInput)
            const databaseRef = firebase.database().ref()
            databaseRef.push(this.state.userInput)
            this.setState({
                userInput: ''
            })
        }

        handleChange = (event) => {
            event.preventDefault();
            
            this.setState({
                userInput: event.target.value 
            })
        }

        componentDidMount() {
            const databaseRef = firebase.database().ref();
            databaseRef.on('value', response => {
                const newNextSteps = [];
                const data = response.val();
                for (let key in data) {
                    newNextSteps.push({
                        key: key,
                        stepEntry: data[key]
                    })
                }
                this.setState({
                    nextStep: newNextSteps
                })
            })
        }

        removeStep = (nextStepId) => {
            const databaseRef = firebase.database().ref()
            databaseRef.remove();
        }


        render() {
            return ( 
                <div className="NextSteps">
                        {this.state.nextStep.map((nextstepEntry) => {
                            return(
                                <div className="nextstepText" key={nextstepEntry.id}>
                                    <h2>Next Steps:</h2>
                                    <p></p>
                                    <p>{nextstepEntry.stepEntry}</p>
                                    <button className="deleteButton" onClick = {() => this.removeStep(nextstepEntry.id)}>Delete</button>
                                </div>
                            )
                        })}

                     <form action="submit" onSubmit={this.handleSubmit} data-key={this.props.key}>
                        <input type="text" placeholder="enter next step here" onChange={this.handleChange} name="userInput" value={this.state.userInput} />
                        <button type="submit">Add Next Step</button>
                    </form>
                </div>
            );
        }   
}

export default NextSteps;
