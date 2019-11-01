import React, {useState} from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import AuthorForm from './components/AuthorForm'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage("error.graphQLErrors[0].message")
    setTimeout(() => {
      setErrorMessage(null)
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
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/authors">Author</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/authors">
            <Authors />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
     {errorMessage&&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
    <Books result={books}/>
   <Authors result={authors}/>
    <h2>create new</h2>
    <NewBook  addBook={addBook}/>
      {/* refetchQueries={[{ query: ALL_BOOKS }]} onError={handleError} */}
    <AuthorForm editAuthor={editAuthor} />
      
  </>)
}

export default App