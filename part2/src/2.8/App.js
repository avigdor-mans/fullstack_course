import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' ,
    phone: '0548546431',
      id:1 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const addPerson = (person)=>{
    person.preventDefault()
    if (''===persons.reduce((acc,cur)=>newName===cur.name?acc.concat(newName):acc,'')){
      const tmpPerson = { name:newName , phone:newNumber , id:persons.length+1}
      setPersons(persons.concat(tmpPerson))
      setNewName('')
      setNumber('')
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
  }
  const handleNewName = (name)=>{
    setNewName(name.target.value)
  }
  const handleNewNumber = (number)=>{
    setNumber(number.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person)=><Name key={person.id} name={person.name} cell={person.phone} />)}
      </div>
    </div>
  )
}

export default App