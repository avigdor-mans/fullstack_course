import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return props.message.type==='disply' ?
   (
    <div style={style}>
      {props.message.message}
    </div>
  ) :
  null
}

const mapStateToProps = (state) =>({message: state.message})

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
