import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = ()=>
    axios
    .get(url)
    .then(response => response.data)

const addContact = (newContact)=>
    axios
    .post(url, newContact)
    .then(response => response.data)

const changeNumber = (id, newNumber) => axios
    .put(`${url}/${id}`, newNumber)
    .then(response => response.data)

const deleteContact = (id) =>
    axios
    .delete(`${url}/${id}`)
    .then(response => response.data)
    

export default {getAll, addContact, changeNumber, deleteContact}