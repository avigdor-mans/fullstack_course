import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) =>{
  if(good>0 || neutral>0 || bad>0){  
    return(
      <div>
        <h1>statistics</h1>
        <table>
        <tbody>
        <Statistic text="good" val={good} />
        <Statistic text="neutral" val={neutral} />
        <Statistic text="bad" val={bad} />
        <Statistic text="all" val={good+neutral+bad} />
        <Statistic text="average" val={((good-bad)/(good+neutral+bad))||0} />
        <Statistic text="positive" val={(good/(good+neutral+bad)*100||0) + ' %'} />
        </tbody>
        </table>
      </div>
    )
  }

  return(<div><h1>statistics</h1> <p>No feedback given</p></div>)
}


const Statistic = ({text, val}) => (<tr><td>{text} </td><td>{ val}</td></tr>)


const Button = ({fun, text}) => (<button onClick={fun}>{text}</button>)
const App = () => {

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

   

  return (
    <div>
      
      <div><h1>give feedback</h1></div>
      <Button fun={()=>setGood(good+1)} text="good" />
      <Button fun={()=>setNeutral(neutral+1)} text="neutral" />
      <Button fun={()=>setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)