import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'


const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [ name, setName ] = useState('')
  const [ year, setYear ] = useState('')
  
  const [ editYear, result ] =  useMutation(EDIT_AUTHOR,{
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      console.table(error)
    }
  })
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('authot not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const editAuthor = async (e)=>{
    e.preventDefault()
    editYear({variables: {name, year: parseInt(year,10)}})
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {props.token?
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={editAuthor}>
        <div>
          name
          <select
            value={name}
            onChange={(e)=>setName(e.target.value)}
          >
          {authors.data.allAuthors.map((a)=> 
            (<option key={a.name} value={a.name}>{a.name}</option>))}
          </select>

        </div>
        <div>
          born
          <input
            type='number'
            value={year}
            onChange={(e)=>setYear(e.target.value)} />
          <br />
          <button type="submit">update</button>
        </div>
        </form>
      </div>
      : null }
    </div>
     
    
  )
}

export default Authors
