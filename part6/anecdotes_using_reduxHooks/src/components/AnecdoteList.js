import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/anecdoteReducer'

const AnecdoteList = ()=>{
    
    const dispatch = useDispatch()

    const anecdotes = useSelector(({filterAn, blogs}) => {
        if(filterAn==='All' || filterAn===''){
            return blogs
        }
        return Object.values(blogs).filter((blog) => blog.content.toLowerCase().includes(filterAn.toLowerCase()))
    })

    const addVote = (id, votes, content) => {
        dispatch(newVote(id, votes, content))
        dispatch(setNotification(`You voted \'${content}\'`,5))
    } 

    return (
        <div>
            {anecdotes.sort((a1, a2) => a2.votes-a1.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => addVote(anecdote.id, anecdote.votes, anecdote.content)}>vote</button>
                    </div>
                </div>)}
        </div>)
}


export default AnecdoteList