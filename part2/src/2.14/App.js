import React, {useEffect , useState } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countreis'
import axios from 'axios'
import Name from './components/Name'

const App = () => {
  const [ countrys, setCountrys ] = useState([]) 
  const [ newFilter, setFilter ] = useState('')    
  const [ toShow , setToShow ] = useState(false)
  const [ country, setCountry ] = useState('')
  const [ weather, setWeather ] = useState('')
  const [ params, setParams] = useState({access_key: process.env.REACT_APP_API_KEY , query:'New York'})
  useEffect(() => {
    console.log('effect1')
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        console.log('promise fulfilled1')
        setCountrys(response.data)
      })
      
    },[])
    
  useEffect(()=>{
    console.log('effect2')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${params.query}`)
      .then(response => {
        
        console.log('promise fulfilled2')
        setWeather(response.data)
      })
},[params])
  const handleNewFilter = (name)=>{
    setFilter(name.target.value)
  }
  const handleShow = (countryToShow)=>{
    if (countryToShow!==''){
    
    if (country===''){
      setToShow(!toShow)
    }
    if(country.name===countryToShow.name){
      setToShow(!toShow)
      setCountry('')
    }else{
      setCountry(countryToShow)
    }
    handleParams(countryToShow.capital)
  } 
  else{
    setCountry('')
    setToShow(false)
  }

  }
  const show = ()=>{
    return (<div><Name key={country.name} country={country} weather={weather} /></div>)
  }
  const handleParams = (capital)=>setParams({access_key: process.env.REACT_APP_API_KEY , query:capital})
  return (
    <div>
      <form>
        <div>
          <Filter val={newFilter} handler={handleNewFilter} />
        </div>
      </form>
      <div>
        <Countries countriesList={countrys} filter={newFilter} toShow={toShow} showHandler={handleShow} weather={weather} params={params} paramsHandler={handleParams} />
      </div>
      {toShow ? show() : null}
    </div>
  )
}

export default App