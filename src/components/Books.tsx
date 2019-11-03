import React from "react"
import Book from "./interfaces"

interface Props {
  result?: any
}

const Books: React.FC<Props> = (Props) => {
  /*   if (Props) {
      return <div>loading...</div>
    } */
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
          {Props.result.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books