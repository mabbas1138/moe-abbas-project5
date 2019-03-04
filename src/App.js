import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header.js'
import './Header/Header.css';
import image from './assets/waterBucket2.png';
import firebase from './firebase.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            goal: '',
            deadline: '',
            notes: '',
            entries: [],
            isLoading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const entryRef = firebase.database().ref('entries');
        const entry = {
            goal: this.state.goal,
            deadline: this.state.deadline,
            notes: this.state.notes
        };

        entryRef.push(entry);
        this.setState({
            goal: '',
            deadline:'',
            notes: ''
        });
    };

    removeEntry(entryId) {
        const entryRef = firebase.database().ref(`/entries/${entryId}`);
        entryRef.remove();
    };

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
            };
            this.setState({
                entries: newState,
                isLoading: false
            });
        });
    };

  render() {
    return (
      <div className='App' id='mainContent'>
      {/* see index.html file for skipLink code*/}
        <Header />
        <section className='userInputs'>
          <form onSubmit={this.handleSubmit}>
            <div className='inputSubject'>
                <h3>Goal:</h3>
                <label htmlFor='goal' className='visuallyHidden' />
                <input type='text' name='goal' onChange={this.handleChange} value={this.state.goal} required />
            </div>
            <div className='inputSubject'>
                <h3>Deadline:</h3>
                <label htmlFor='deadline' className='visuallyHidden' />
                <input type='text' name='deadline' onChange={this.handleChange} value={this.state.deadline} required />
            </div>
            <div className='inputSubject'>
                <h3>Notes:</h3>
                <label htmlFor='notes' className='visuallyHidden' />
                <textarea name='notes' placeholder=' Max. 200 characters' onChange={this.handleChange} value={this.state.notes}  cols='19' maxlength='200' required />
            </div>
                <button className='addStyle'>Add Entry</button>
          </form>
          <div className="bucket">
            <img src={image} alt="a red bucket of water" />
          </div>
        </section>
        <section className='entryDisplay'>
          <div className='entryDisplayWrapper'>
            <ul>
            {this.state.isLoading ? ( 
                <p className="errorHandling"> The Page is Loading </p>
            ) : (
              this.state.entries.map((entry) => {
                  return (
                    <div className='entryItemContainer'>
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
                          <button className='deleteStyle' onClick={() => this.removeEntry(entry.id)}>Delete</button>
                        </li> 
                    </div>
                  );
              })
            )}
            </ul>
         </div>
        </section>
    </div>
    );
  };
};
export default App;

