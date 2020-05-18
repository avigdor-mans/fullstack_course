import React from 'react';

const Name = ({person})=>{
      return(<tr key={person.id} ><td>{person.name} </td><td> {person.number}</td></tr>)
  }

export default Name

