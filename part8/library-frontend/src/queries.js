import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
      id
    }
  }
  `

export const ALL_BOOKS = gql`
  query {
    allbooks {
      title
      author
      published
    }
  }
  `

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres:[String]!) {
    addPerson(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
  `

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $year: Int!) {
    editNumber(name: $name, setBornTo: $year)  {
      name
      born
      bookCount
      id
    }
  }
`