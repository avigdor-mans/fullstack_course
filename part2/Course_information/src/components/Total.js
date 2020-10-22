import React from 'react'

const Total = ({parts})=>{
    return(
      <div>
        <p style={{fontWeight: "bold"}}>
  
           Total of {parts.reduce((acc,part)=>acc+part.exercises,0)} exercises
        </p>
      </div>
    )
  }

export default Total