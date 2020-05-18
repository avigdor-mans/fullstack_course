import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      id:1 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const addPerson = (person)=>{
    person.preventDefault()
    setPersons(persons.concat({name: newName, id:persons.length+1}))
    setNewName('')
  }
  const handleNewName = (person)=>{
    setNewName(person.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((name)=><Name key={name.id} name={name} />)}
      </div>
    </div>
  )
}

export default App