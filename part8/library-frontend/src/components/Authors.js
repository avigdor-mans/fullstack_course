import React, { useEffect, useState } from 'react'
import {ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ year, setYear ] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [ editYear, result ] =  useMutation(EDIT_AUTHOR,{
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      console.log(error)
    }
    })
    
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const esitAuthor = async (e)=>{
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
            <th>
            name
            </th>
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

      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={esitAuthor}>
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
            value={year}
            onChange={(e)=>setYear(e.target.value)} />
        </div>
        </form>
      </div>
    </div>
    
  )
}

export default Authors
