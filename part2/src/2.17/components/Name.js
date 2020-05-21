import React from 'react';

const Name = ({person, deleteFun})=>{
      return(<tr key={person.id} ><td>{person.name} </td><td> {person.number}</td><td><button onClick={()=>deleteFun(person)} >delete</button></td></tr>)
  }

export default Name

