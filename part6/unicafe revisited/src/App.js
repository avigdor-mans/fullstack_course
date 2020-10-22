import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const changeStore = (event) => {
    store.dispatch({
      type: event
    })
  }

  return (
    <div>
      <button onClick={ () => changeStore('GOOD') } >good</button> 
      <button onClick={ () => changeStore('OK') }>neutral</button> 
      <button onClick={ () => changeStore('BAD') }>bad</button>
      <button onClick={ () => changeStore('ZERO') }>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App