import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/anecdoteReducer'
const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote(content)
        props.setNotification(`The anecdote \'${content}\' has added`,5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote} >
                <div><input name='anecdote' type='text' /></div>
                <button type="submit" >create</button>
            </form>
        </div>)
}

const mapDispatchToProps = {
    newAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm 