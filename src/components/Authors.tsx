import React from 'react'
import AuthorForm from "./AuthorForm"
import Author from "../interfaces"

interface Props {
  result: {
    data:{
      allAuthors:Array<Author>
    }
    loading: boolean
  },
  editAuthor: () => void
}
const Authors: React.FC<Props> = ({ result, editAuthor }) => {
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
      <AuthorForm editAuthor={editAuthor} />
    </div>
  )
}

export default Authors