import React, { useEffect ,useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './components/axios'
import Msg from './components/Msg'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('') 
  const [ msg, setMsg ] = useState(null)
  const [ msgStyle, setMSgStyle ] = useState('')

  useEffect(() => {
    contactService.getAll()
    .then(contacts => setPersons(contacts.sort((a, b) => a.name > b.name ? 1 : -1)))
  },[])
  const setColor = (color) =>
    setMSgStyle({
      color: color,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    })

  const addPerson = (person)=>{
    person.preventDefault()
    const existsPerson = persons.filter((cur)=>newName===cur.name)
    const tmpPerson = { name:newName , number:newNumber}
    if (newNumber!=='' && newName!=='' && 0===existsPerson.length){
      contactService.addContact(tmpPerson)
      .then(newContact =>{
        setPersons(persons.concat(newContact).sort((a, b) => a.name > b.name ? 1 : -1))
        setColor('green')
        setMsg(`Added ${newName}`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
        setNewName('')
        setNumber('')
        })
    }
    else if(newNumber==='' || newName===''){
      window.alert(`please put all the contact info`)
    }
    else if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        contactService.changeNumber(existsPerson[0].id, { ...existsPerson[0], number:newNumber})
        .then(contact => {
          setPersons(persons.map((person)=>person.id!==contact.id ? person : contact).sort((a, b) => a.name > b.name ? 1 : -1))
          setColor('green')
          setMsg(`${contact.name} was update with a new number`)
          setTimeout(() => {
          setMsg(null)
          }, 5000)
          setNewName('')
          setNumber('')
        })
    }
    
  }

  const handleNewName = (name)=>{
    name.preventDefault()
    setNewName(name.target.value)
  }

  const handleNewNumber = (number)=>{
    number.preventDefault()
    setNumber(number.target.value)
  }

  const handleNewFilter = (name)=>{
    name.preventDefault()
    setFilter(name.target.value)
  }
  
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      contactService.deleteContact(person.id)
      .then(name=>{
        setPersons(persons.filter((contact) => contact.id !== person.id).sort((a, b) => a.name > b.name ? 1 : -1))
        setColor('green')
        setMsg(`${person.name} was deleted`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      })
      .catch(error => {
        setColor('red')
        setMsg(`Information of ${person.name} has already removed from server`)
        setTimeout(() => {
          setMsg(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Msg msg={msg} style={msgStyle} />
      <form>
        <div>
          <Filter text="filter shown with" val={newFilter} handler={handleNewFilter} />
        </div>
      </form>
      <h3>add a new contact</h3>
      <PersonForm  addFun={addPerson} nameVal={newName} numberVal={newNumber} nameHandler={handleNewName} numberHandler={handleNewNumber} />
      <h2>Numbers</h2>
      <div>
        <Persons personsList={persons} toFilter={newFilter} deleteFun={handleDelete} />
      </div>
    </div>
  )
}

export default App