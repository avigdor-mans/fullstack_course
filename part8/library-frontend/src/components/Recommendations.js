import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FAVOURITE_BOOK, GET_USER } from '../queries'

const Recommendations = (props) => {
  const [ getBooks, result ] = useLazyQuery(FAVOURITE_BOOK)
  const [ books, setBooks ] = useState(null)
  const user = useQuery(GET_USER)

  useEffect(()=> {
    if(props.token && user.data){
      getBooks({variables:{genre:user.data.me.favoriteGenre}})
    }
  },[user.data, props.token, getBooks])
  
  useEffect(()=> {
    if(result.data)
      setBooks(result.data.allBooks)
  },[result,user.data,props.token])

  if(!props.show || !props.user)
    return null

  if(!books)
    return <div>loading...</div>
  
  return (
    <div>
      <h2>Recommendations</h2>
      <br/>
      <h3>books in your favorite genre {user.data.me.favoriteGenre}</h3>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations