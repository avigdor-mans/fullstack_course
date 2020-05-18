import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const P = ({text})=><p>{text}</p>
const Button = ({fun,val,text})=>(<button onClick={()=>fun(val)} >{text}</button>)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  /*const random = ()=>((Math.random()*10)%5).toFixed(0)*/
  const [points,setPoints] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const addVote = (num)=>{
    const copy= points.concat([])
    copy[num]+=1
    setPoints(copy)
    
  }
  return (
    <div>
      <P text={props.anecdotes[selected]} />
      <P text={'has '+points[selected]+' votes'} />
      <Button fun={addVote} val={selected} text="vote" />
      <Button fun={setSelected} val={()=>((Math.random()*10)%5).toFixed(0)} text="next anecdote" />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)