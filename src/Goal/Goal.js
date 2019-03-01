import React, { Component } from 'react';

const Goal = (props) => {
    console.log(props);
    return (
        <div className="goalText">
            <h2>Goal:</h2>
            <p key={props.goal.id} />
            <p>{props.goal}</p>
            <form action="submit" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="enter goal here"
                onChange={this.handleChange}
                name="userInput"
                value={this.state.userInput}/>
              <button type="submit">Add Goal</button>
            </form>
        </div>
    )
}



export default Goal;