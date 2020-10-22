import React from 'react';
import Name from './Name'

const Persons = ({personsList, toFilter, deleteFun})=>{
   return (<table><tbody>{personsList.filter((person)=>person.name.substring(0,toFilter.length).toLowerCase()===toFilter.toLowerCase())
        .map((person)=><Name key={person.id} person={person} deleteFun={deleteFun} />)}</tbody></table>)
}

export default Persons