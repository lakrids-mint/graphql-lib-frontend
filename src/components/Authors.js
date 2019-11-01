import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

const Authors = ({ result }) => {
  const client = useApolloClient()

  console.log(result)
  if (result.loading) {
    return <div>loading...</div>
  }


  

  return (
    <div>
      <h2>Authors</h2>
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
          {result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}

export default Authors