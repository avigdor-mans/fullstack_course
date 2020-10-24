import React from 'react'
import { connect } from 'react-redux'
import { newVote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/anecdoteReducer'

const AnecdoteList = (props)=>{
    const addVote = (id, votes, content) => {
        props.newVote(id, votes, content)
        props.setNotification(`You voted \'${content}\'`,5)
    } 

    return (
        <div>
            {props.blogs.sort((a1, a2) => a2.votes-a1.votes).map(anecdote =>
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

const mapDispatchToProps = {
    newVote,
    setNotification
}

const mapStateToProps = (state) => {
    if(state.filterAn==='All' || state.filterAn===''){
        return {blogs: state.blogs}
    }
    return {blogs: Object.values(state.blogs)
        .filter((blog) => blog.content.toLowerCase().includes(state.filterAn.toLowerCase()))}
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList 