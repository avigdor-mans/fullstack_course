
import React from 'react'
import { useSelector } from 'react-redux'

const Msg = () =>{

  const notification = useSelector(state=>state.message)

  const style = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return   notification.type==='remove' ? null : <p style={style} >{notification.message}</p>
}

export default Msg
