import React from 'react';
import Name from './Name'

const Persons = ({personsList, toFilter})=>{
   return (<div>{personsList.filter((person)=>person.name.substring(0,toFilter.length).toLowerCase()===toFilter.toLowerCase())
        .map((person)=><Name key={person.id} name={person.name} cell={person.phone} />)}</div>)
}

export default Persons