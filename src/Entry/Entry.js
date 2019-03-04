import React from 'react';

const Entry = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className='inputSubject'>
                <h3>Goal:</h3>
                <label htmlFor='goal' className='visuallyHidden' />
                <input type='text' name='goal' onChange={props.handleChange} value={props.goal} required />
            </div>
            <div className='inputSubject'>
                <h3>Deadline:</h3>
                <label htmlFor='deadline' className='visuallyHidden' />
                <input type='text' name='deadline' onChange={props.handleChange} value={props.deadline} required />
            </div>
            <div className='inputSubject'>
                <h3>Notes:</h3>
                <label htmlFor='notes' className='visuallyHidden' />
                <textarea name='notes' placeholder=' Max. 200 characters' onChange={props.handleChange} value={props.notes}  cols='19' maxlength='200' required />
            </div>
                <button className='addStyle'>Add Entry</button>
        </form>
    )
}

export default Entry;