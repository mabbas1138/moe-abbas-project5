import React, { Component } from 'react';
import './App.css';
// import Goal from '.Goal/Goal.js';
// import './Goal/Goal.css';
// import ErrorHandling from './ErrorHandling/ErrorHandling.js';
// import './ErrorHandling/ErrorHandlig.css';
import firebase from './firebase.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            goal: '',
            deadline: '',
            notes: '',
            entries: [],
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
            notes: this.state.notes
        }
        entryRef.push(entry);
        this.setState({
            goal: '',
            deadline:'',
            notes: ''
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
                    notes: entries[entry].notes
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
                <h1>Don't Kick the Bucket List</h1>
                <h2>Don't Die with Regrets</h2>
            </div>
        </header>
        <section className='userInputs'>
          <form onSubmit={this.handleSubmit}>
            <div className='inputSubject'>
                <h3>Goal:</h3>
                <input type="text" name="goal" onChange={this.handleChange} value={this.state.goal} required />
            </div>
            <div className='inputSubject'>
                <h3>Deadline:</h3>
                <input type="text" name="deadline" onChange={this.handleChange} value={this.state.deadline} required />
            </div>
            <div className='inputSubject'>
                <h3>Notes:</h3>
                <textarea name="notes" placeholder=" Max. 200 characters" onChange={this.handleChange} value={this.state.notes}  cols='19' maxlength='200' required />
            </div>
            <button className='addEntry'>Add Entry</button>
          </form>
        </section>
        <section className='entryDisplay'>
          <div className='entryDisplayWrapper'>
            <ul>
              {this.state.entries.map((entry) => {
                  return (
                    <div className='entryItemContainer' id='entryItemContainer'>
                        <li key={entry.id}>
                            <div className='entryItem'>
                                <h3>Goal</h3>
                                <p>{entry.goal}</p>
                            </div>
                            <div className='entryItem'>
                                <h3>Deadline</h3>
                                <p>{entry.deadline}</p>
                            </div>
                            <div className='entryItem'>
                                <h3>Notes</h3>
                                <p className='notesBlock'>{entry.notes}</p>
                            </div>
                            <button onClick={() => this.removeEntry(entry.id)}>Delete</button>
                        </li> 
                    </div>
                  )
              })}
            </ul>
          </div>
        </section>
    </div>
    );
  }
}
export default App;

