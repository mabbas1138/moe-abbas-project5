import React, { Component } from 'react';
import './App.css';
import Goal from './Goal/Goal.js';
import './Goal/Goal.css';
// import Comment from './Comment/Comment.js';
// import './Comment/Comment.css';
import firebase from './firebase.js';


class App extends Component {
    constructor() {
        super();
        this.state = {
            goal: [],
            // comment: [],
            userInput: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const databaseRef = firebase.database().ref();
        databaseRef.push({
            goal: this.state.goal
        })
        databaseRef.push(this.state.goal);
        this.setState({
            goal: [],
            // comment: [],
            userInput: ''
        })
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        const databaseRef = firebase.database().ref();
        databaseRef.on('value', response => {
            const newGoal = [];
            // const newComment = [];
            const data = response.val();
            for (let key in data) {
                newGoal.push({
                    key: key,
                    writtenGoal: data[key]
                })

                // newComment.push({
                //     key: key,
                //     writtenComment: data[key]
                // })
            }
            this.setState({
                goal: newGoal
                // comment: newComment
            })
        })
    }

    removeEntry = (id) => {
        const databaseRef = firebase.database().ref(id)
        databaseRef.remove();
    }


  render() {
    return (
      <div className="App">
        <h1>Bucket List</h1>
            <div className="Goal">
                <h2>Goal:</h2>
                    {this.state.goal.map(goalEntry => {
                    return(
                            <Goal 
                                key={goal.id}
                                writtenGoal={newGoal}
                                onSubmit={this.handleSubmit}
                            />
                    );
                })}
            </div>
    </div>
    );
  }
}

export default App;

