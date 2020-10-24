import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/anecdoteReducer'
const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(setNotification(`The anecdote \'${content}\' has added`,5))
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

export default AnecdoteForm