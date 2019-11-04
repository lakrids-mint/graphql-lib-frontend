import React from "react"
import Book from "./interfaces"

interface Props {
  result: {
    data:{
      allBooks:Array<Book>
    }
    loading: boolean
  },
}

const Books: React.FC<Props> = ({result}) => {
  if (result.loading) {
      return <div>loading...</div>
    } 
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books