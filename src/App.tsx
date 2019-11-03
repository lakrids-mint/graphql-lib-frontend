/* eslint-disable indent */
import React, { useState } from "react"
import { gql } from "apollo-boost"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    id
    
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    published
    
  }
}
`
const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born,
     
    ) {
      name
      born
      
    }
  }
`
const App: React.FC = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [errorMessage, setErrorMessage] = useState("")

  const handleError = () => {
    setErrorMessage("hey!")
    setTimeout(() => {
      setErrorMessage("")
    }, 10000)
  }

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  return (
    <>
      {errorMessage &&
        <div style={{ color: "red" }}>
          {errorMessage}
        </div>
      }
      <Router><div>
        <Link to="/addbook"><button>Add book</button></Link>
        <Link to="/"><button>Authors</button></Link>
        <Link to="/books"><button>Books</button></Link>
      </div>
        <div>
          <Route exact path="/addbook" render={() => <NewBook addBook={addBook} />} />
          <Route path="/books" render={() => <Books books={books} />} />
          <Route exact path="/" render={() => <Authors authors={authors} editAuthor={editAuthor} />} />
        </div>
      </Router>
    </>)
}

export default App