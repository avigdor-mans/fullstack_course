
import React from 'react'

const Msg = ({msg})=>
    msg===null? null : <p className="msg">{msg}</p>

export default Msg
