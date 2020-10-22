
import React from 'react'

const Msg = ({msg, style})=>
    msg===null? null : <p style={style} >{msg}</p>

export default Msg
