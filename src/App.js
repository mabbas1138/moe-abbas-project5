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
            goal: '',
            deadline: '',
            startDate: '',
            entries: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const entryRef = firebase.database().ref('entries');
        const entry = {
            goal: this.state.goal,
            deadline: this.state.deadline,
            startDate: this.state.startDate
        }
        entryRef.push(entry);
        this.setState({
            goal: '',
            deadline:'',
            startDate:''
        })
    }

    removeEntry(entryId) {
        const entryRef = firebase.database().ref(`/entries/${entryId}`);
        entryRef.remove();
    }

    componentDidMount() {
        const entryRef = firebase.database().ref('entries');
        entryRef.on('value', viewEntry => {
            let entries = viewEntry.val();
            let newState = []; 
            for (let entry in entries) {
                newState.push({
                    id: entry,
                    goal: entries[entry].goal,
                    deadline: entries[entry].deadline,
                    startDate: entries[entry].startDate
                });
            }
        this.setState({
            entries: newState
        })
    })
}

  render() {
    return (
      <div className='App'>
        <header>
            <div className='titleWrapper'>
              <h1>Bucket List Planner</h1>
              <h2>Because only losers die with regrets</h2>
            </div>
        </header>
        <div className='inputContainer'>
          <section className='userInputs'>
              <form onSubmit={this.handleSubmit}>
                <h3>Goal</h3>
                <input type="text" name="goal" placeholder="No Mickey Mouse Bullshit!" onChange={this.handleChange} value={this.state.goal} />
                <h3>Deadline</h3>
                <input type="text" name="deadline" placeholder="Deadline" onChange={this.handleChange} value={this.state.deadline} />
                <h3>Start Date</h3>
                <input type="text" name="startDate" placeholder="Crush time with willpower!" onChange={this.handleChange} value={this.state.startDate} />
                <button>Add Entry</button>
              </form>
          </section>
          <section className='entryDisplay'>
            <div className='entryDisplayWrapper'>
              <ul>
                {this.state.entries.map((entry) => {
                    return (
                        <li key={entry.id}>
                            <h3>{entry.goal}</h3>
                            <p>I will crush this sweet ass goal by <span className='deadlineEmph'>{entry.deadline}</span></p>
                            <p> I will work towards crushing said goal by <span className='startDateEmph'>{entry.startDate}</span></p>
                            <button onClick={() => this.removeEntry(entry.id)}>Delete (because I'm a loser)</button>
                        </li>
                    )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;

