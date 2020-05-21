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

export default {getAll, addContact}