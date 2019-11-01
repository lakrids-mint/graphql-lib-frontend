import React from 'react'
import AuthorForm from "./AuthorForm"

const Authors = ({ result, editAuthor }) => {
  console.log('author comp')
  if (result.loading ) {
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
      <AuthorForm editAuthor={editAuthor} />

    </div>
  )
}

export default Authors