import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS} from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres , setGenres] = useState([])

  const [ createBook, result ] = useMutation(CREATE_BOOK,{
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.warn(error)
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addPerson)
    }
  })
  
  useEffect(() => {
    if (result.data && result.data.addBokk === null) {
      console.log('book not added')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({variables:{ title, author, published: parseInt(published, 10), genres}})

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
    <br/>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(', ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook