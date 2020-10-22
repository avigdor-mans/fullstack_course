import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state=>state.message)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return notification.type==='disply' ?
   (
    <div style={style}>
      {notification.message}
    </div>
  ) :
  null
}

export default Notification