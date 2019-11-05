import React, { useState } from "react"
import { MutationFunctionOptions, ExecutionResult } from "@apollo/react-common"

interface Props {
  addBook:
   (options?: MutationFunctionOptions<any, Record<string, any>> | undefined) => Promise<ExecutionResult<any>>//this can't be optimal, it's barely readable
  }

const NewBook: React.FC<Props> = ({ addBook }) => {
  const [title, setTitle] = useState("")
  const [author, setAuhtor] = useState("")
//explicitly setting number or string as type otherwise the parseInt and value attribute wont work - is this how it's done?
  const [published, setPublished] = useState<string | number >("")
  const [genre, setGenre] = useState("")
  //infers array to never[] if not set explicitly 
  const [genres, setGenres] = useState<Array<String>>([""])

  const submit = async (e:React.FormEvent) => {
    e.preventDefault()
    await addBook({
      variables: { title, author, published, genres }
    })
    
    setTitle("")
    setPublished("")
    setAuhtor("")
    setGenres([""])
    setGenre("")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <h1>Add book</h1>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number.parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(" ")}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook