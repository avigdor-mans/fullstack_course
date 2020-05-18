import React from 'react';

const Header = ({course})=>{
    return (
      <div>
        <h1 id={course.id}>
          {course}
        </h1>
      </div>
    )
  }

export default Header