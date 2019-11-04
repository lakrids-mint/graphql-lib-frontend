/* eslint-disable indent */
import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR, CREATE_BOOK} from "./graphql"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"


const App: React.FC = () => {
   //error handling 
   const [errorMessage, setErrorMessage] = useState<null|string |void>(null)

   const handleError = (error:any) => {
    setErrorMessage(error.graphQLErrors.length === 0? "something went wrong":error.graphQLErrors[0])
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  } 
  //Queries
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  //Mutations
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
          <Route path="/books" render={() => <Books result={books} />} />
          <Route exact path="/" render={() => <Authors result={authors} editAuthor={editAuthor} />} />
        </div>
      </Router>
    </>)
}

export default App