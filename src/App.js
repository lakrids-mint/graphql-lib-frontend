import React, {useState} from 'react'
import { Query, Mutation, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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
const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
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
  </>)
}

export default App