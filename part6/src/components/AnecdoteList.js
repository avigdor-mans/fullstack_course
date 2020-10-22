import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/anecdoteReducer'

const AnecdoteList = ()=>{
    
    const anecdotes = useSelector(({filterAn, blogs}) => {
        if(filterAn==='All' || filterAn===''){
            return blogs
        }
        return Object.values(blogs).filter((blog) => blog.content.toLowerCase().includes(filterAn.toLowerCase()))
    })
    const dispatch = useDispatch()
    const addVote = (id,content) => {
        dispatch(vote(id))
        dispatch(setNotification(`You voted \'${content}\'`))
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
                        <button onClick={() => addVote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>)}
        </div>)
}


export default AnecdoteList