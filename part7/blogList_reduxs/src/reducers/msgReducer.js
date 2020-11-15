let toClear = null

export const setNotification = (message, color) => {
    return dispatch => {
      if(toClear)
        clearTimeout(toClear)
      dispatch({ type:'disply', message:message, color: color })
      toClear = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    } 
  }
  
  export const removeNotification = () => {
    return dispatch => {
      dispatch({ type:'remove', message:'', color: 'white'})
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