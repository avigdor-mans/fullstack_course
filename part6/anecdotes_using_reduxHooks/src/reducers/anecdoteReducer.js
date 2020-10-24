import anecdoteService from '../components/axios'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const newAnecdote = (content) => {
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({ type: 'addAnecdote', data: newAnecdote })
  }
  }

export const newVote = (id, votes, content) => {
  return async dispatch => {
    const upsateAnecdote = await anecdoteService.addVote(id, {content: content, votes: votes+1})
    dispatch({ type: 'vote', data: id })
  }
}

// const initialState = anecdotesAtStart.map(asObject)

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({type: 'init',
    data: anecdotes,})
    
  }
}
const actReducer = (state = [], action) => {
  switch (action.type) {
    case 'addAnecdote' :
      return state.concat([action.data])
    case 'vote' :
      return state.map((anecdote)=>
        anecdote.id!==action.data ? 
          anecdote : 
          {...anecdote, votes: anecdote.votes + 1})
    case 'init' :
      return action.data
    default: return state
  }
}

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({ type:'disply', message:message})
    setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
  } 
}

export const removeNotification = () => {
  return dispatch => {
    dispatch({ type:'remove', message:''})
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'disply' :
      return action
    case 'remove' : 
      return action
    default : return state
  }
}

export const setFilter = (text)=> ({type:'filter', filter:text })
const filterReducer = (state='', action) => {
  switch (action.type) {
    case 'filter': 
      return action.filter
    default: return state
  }
}

export default { actReducer, notificationReducer, filterReducer}