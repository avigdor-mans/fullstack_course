import React from 'react';
import Name from './Name'

const Countreis = ({countriesList, filter, toShow, showHandler, weather, params, paramsHandler})=>{
        const filterCountriesList = countriesList.filter((cur)=>cur.name.toLowerCase().includes(filter.toLowerCase()))
        if(filterCountriesList.length <= 10) {
                if(filterCountriesList.length === 1){
                        if(toShow)
                                showHandler('')
                        if (params.query!==filterCountriesList[0].capital)
                                paramsHandler(filterCountriesList[0].capital)
                        return (<Name key={filterCountriesList[0].name} country={filterCountriesList[0]} weather={weather} />)
                }
                if(filterCountriesList.length === 0){
                        if(toShow)
                                showHandler('')
                        return (<p>There is not a country in this filter, specify another filter</p>)
                }
                return (<div>
                         {filterCountriesList.map((country)=> 
                                (<div key={country.numericCode} >{country.name} 
                                <button key={country.capital} onClick = {()=>showHandler(country)}>show</button>
                                </div>))}
                </div>)
        }
        if(toShow)
                showHandler('')
        return (<p>Too many matches, specify another filter</p>)
}

export default Countreis