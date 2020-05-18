import React, { useEffect ,useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countreis'
import axios from 'axios'

const App = () => {
  const [ countrys, setCountrys ] = useState([]) 
  const [ newFilter, setFilter ] = useState('')
  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        console.log('promise fulfilled')
        setCountrys(response.data)
      })
    },[])

  const handleNewFilter = (name)=>{
    setFilter(name.target.value)
  }
  return (
    <div>
      <form>
        <div>
          <Filter val={newFilter} handler={handleNewFilter} />
        </div>
      </form>
      <div>
        <Countries countriesList={countrys} filter={newFilter} showHandler={handleNewFilter} />
      </div>
    </div>
  )
}

export default App