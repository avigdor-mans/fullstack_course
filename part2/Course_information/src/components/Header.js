import React from 'react';

const Header = ({course})=>{
    return (
      <div>
        <h2 id={course.id}>
          {course}
        </h2>
      </div>
    )
  }

export default Header