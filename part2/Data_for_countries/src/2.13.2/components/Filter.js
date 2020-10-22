import React from 'react'

const Filter = ({val,handler})=>{
    return(<p>find countries <input value={val} onChange={handler} /> </p>)
}
export default Filter