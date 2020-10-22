import React from 'react';

const Name = ({country})=>(<div><h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>langusges</h3>
      <ul>{country.languages.map((language)=><li key={language.name}>{language.name}</li>)}</ul>
      <a href={country.flag}><img alt="stack overflow" src={country.flag} height="100" width="100"></img></a>
      </div>)

export default Name

