import React, { useEffect ,useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (person)=>{
    person.preventDefault()
    if (newNumber!=='' && newName!=='' && ''===persons.reduce((acc,cur)=>newName===cur.name?acc.concat(newName):acc,'')){
      const tmpPerson = { name:newName , number:newNumber , id:persons.length+1}
      setPersons(persons.concat(tmpPerson))
      setNewName('')
      setNumber('')
    }
    else if(newNumber==='' || newName===''){
      window.alert(`please put all the contact info`)
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
  const handleNewFilter = (name)=>{
    setFilter(name.target.value)
  }
  
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <Filter text="filter shown with" val={newFilter} handler={handleNewFilter} />
        </div>
      </form>
      <h3>add a new contact</h3>
      <PersonForm  addFun={addPerson} nameVal={newName} numberVal={newNumber} nameHandler={handleNewName} numberHandler={handleNewNumber} />
      <h2>Numbers</h2>
      <div>
        <Persons personsList={persons} toFilter={newFilter} />
      </div>
    </div>
  )
}

export default App