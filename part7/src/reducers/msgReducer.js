export const setNotification = (message, color) => {
    return dispatch => {
      dispatch({ type:'disply', message:message, color: color })
      setTimeout(() => {
        dispatch(removeNotification())
      }, 10000)
    } 
  }
  
  export const removeNotification = () => {
    return dispatch => {
      dispatch({ type:'remove', message:'', color: ''})
    }
  }

const msgReducer = (state = '', action) => {
    switch (action.type) {
        case 'disply' :
            return action
        case 'remove' : 
            return action
        default : return state
    }
}

export default msgReducer