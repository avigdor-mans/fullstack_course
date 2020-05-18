import React, { useEffect ,useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countreis'
import axios from 'axios'
import Name from './components/Name'
const App = () => {
  const [ countrys, setCountrys ] = useState([]) 
  const [ newFilter, setFilter ] = useState('')    
  const [ toShow , setToShow ] = useState(false)
  const [ country, setCountry ] = useState('')
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
  const handleShow = (countryToShow)=>{
    if (country===''){
      setToShow(!toShow)
    }
    if(country.name===countryToShow.name){
      setToShow(!toShow)
      setCountry('')
    }else{
      setCountry(countryToShow)
    }    
    
  }
  const show = ()=>{
    return (<div><Name key={country.name} country={country} /></div>)
  }
  return (
    <div>
      <form>
        <div>
          <Filter val={newFilter} handler={handleNewFilter} />
        </div>
      </form>
      <div>
        <Countries countriesList={countrys} filter={newFilter} showHandler={handleShow} />
      </div>
      {toShow ? show() : null}
    </div>
  )
}

export default App