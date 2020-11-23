import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [ genres, setGenres ] = useState(null)
  const [ genre, setGenre ] = useState(null)

  useEffect(()=>{
    if(!books.loading){
      const tmp = books.data.allBooks
        .map((b)=>b.genres)
        .reduce((acc,cur)=>acc.concat(cur),[])
      setGenres(tmp.filter((g,i)=>tmp.indexOf(g) === i))
    }
  },[books, books.loading])

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const filteredBooks = () => 
    genre ? 
    (books.data.allBooks.filter((b)=>b.genres.includes(genre))
      .map(a =>
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ))
    : (books.data.allBooks.map(a =>
      <tr key={a.title}>
        <td>{a.title}</td>
       <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ))
  return (
    <div>
      <h2>books</h2>
      <br/>
      <h3>{!genre ? "all books" : `in genre ${genre}`}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks()}
        </tbody>
      </table>
      <div>
        {genres.map((g)=> (<button key={g} onClick={()=> setGenre(g)}>{g}</button>))}
        <button onClick={()=> setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books