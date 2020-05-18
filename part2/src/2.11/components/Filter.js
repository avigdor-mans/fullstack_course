import React from 'react'

const Filter = ({text,val,handler})=>{
    return(<p>{text} <input value={val} onChange={handler} /> </p>)
}
export default Filter