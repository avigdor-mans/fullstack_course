import React from 'react'

const Filter = ({val,handler})=>{
    return(<p>find countries <input value={val} onChange={(event)=>handler(event.target.value)} /> </p>)
}
export default Filter