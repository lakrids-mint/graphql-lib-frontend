import React, {useState} from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import AuthorForm from './components/AuthorForm'

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    
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
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage("error.graphQLErrors[0].message")
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (
    <>
     {errorMessage&&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
    <ApolloConsumer>
      {(client =>
        <Query query={ALL_BOOKS} >
          {(result) =>
            <Books result={result} client={client} />
          }
        </Query>
      )}
    </ApolloConsumer>
    <ApolloConsumer>
      {(client =>
        <Query query={ALL_AUTHORS}>
          {(result) =>
            <Authors result={result} client={client} />
          }
        </Query>
      )}
    </ApolloConsumer>
    <h2>create new</h2>
      <Mutation mutation={CREATE_BOOK }  refetchQueries={[{ query: ALL_BOOKS }]} onError={handleError}>
        {(addBook) =>
          <NewBook
            addBook={addBook}
          />
        }
      </Mutation>
      <Mutation mutation={EDIT_AUTHOR }  refetchQueries={[{ query: ALL_AUTHORS }]} onError={handleError}>
        {(editAuthor) =>
          <AuthorForm
            editAuthor={editAuthor}
          />
        }
      </Mutation>
  </>)
}

export default App