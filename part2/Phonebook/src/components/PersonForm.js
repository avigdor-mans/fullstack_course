import React from 'react'

const PersonForm = ({addFun,nameVal,numberVal, nameHandler, numberHandler})=>{
    
return(<form onSubmit={addFun}>
        <div>
          name: <input value={nameVal} onChange={nameHandler} />
        </div>
        <div>number: <input value={numberVal} onChange={numberHandler} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

export default PersonForm