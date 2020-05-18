import React from 'react';
import Name from './Name'

const Countreis = ({countriesList, filter, showHandler})=>{
        const filterCountriesList = countriesList.filter((cur)=>cur.name.toLowerCase().includes(filter.toLowerCase()))
        if(filterCountriesList.length <= 10) {
                if(filterCountriesList.length === 1)
                       return (<Name key={filterCountriesList[0].name} country={filterCountriesList[0]} />)
                if(filterCountriesList.length === 0)
                        return (<p>There is not a country in this filter, specify another filter</p>)
                return (<div>
                         {filterCountriesList.map((country)=> 
                                (<div key={country.numericCode} >{country.name} 
                                <button key={country.capital} value={country.name} onClick = {showHandler}>show</button>
                                </div>))}
                </div>)
        }
        return (<p>Too many matches, specify another filter</p>)
}

export default Countreis