// import React, { useState, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'

// const TogglableBlog = React.forwardRef((props,ref) => {
//   const [visible, setVisible] = useState(false)

//   const hideWhenVisible = { display: visible ? 'none' : '' }
//   const showWhenVisible = { display: visible ? '' : 'none' }

//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }

//   useImperativeHandle(ref, () => {
//     return {
//       toggleVisibility
//     }
//   })

//   return (
//     <div>
//       <div id={props.buttonLabel} style={hideWhenVisible}>
//         {props.content} <button onClick={toggleVisibility}>{props.buttonLabel}</button>
//       </div>
//       <div style={showWhenVisible}  className="togglableContent">
//         {props.children}
//         <button onClick={toggleVisibility}>cancel</button>
//       </div>
//     </div>
//   )
// })

// TogglableBlog.propTypes = {
//   buttonLabel: PropTypes.string.isRequired
// }

// TogglableBlog.displayName = 'TogglableBlog'
// export default TogglableBlog