import React from 'react'

const Name = ({country, weather})=>{
      return (<div><h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>langusges</h3>
      <ul>{country.languages.map((language)=><li key={language.name}>{language.name}</li>)}</ul>
      <a href={country.flag}><img alt="stack overflow" src={country.flag} height="100" width="100"></img></a>
      <h3>Weather in {weather.location.name}</h3>
      <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
      <a href={weather.current.weather_icons}><img alt="stack overflow2" src={weather.current.weather_icons[0]} height="50" width="50"></img></a>
      <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>)
}

export default Name

/*<h3>Weather in {weather.location.name}</h3>
      <p>{"temperature:".bold()} {weather.current.temperature} Celcius</p>
      <a href={weather.current.weather_icons}><img alt="stack overflow2" src={weather.current.weather_icons[0]} height="50" width="50"></img></a>
      <p>{"wind:".bold()} {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>*/