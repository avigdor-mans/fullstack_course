import { useState } from 'react'

export const useAnecdote = (name) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const resetValue = () => {
        setValue('')
    }
  
    return {
      name,
      value,
      onChange,
      resetValue    
    }
}