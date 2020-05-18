import React from 'react';

const Part = ({part})=>{
    return(
        <p id={part.id}>
          {part.name} {part.exercises}
        </p>
    )
  }

export default Part