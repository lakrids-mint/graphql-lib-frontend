import React, { useState } from 'react'

type AuthorFormProps = {
  //better or worse than  the NewBook/addBook solution? 
  editAuthor: ({ }) => void
}

interface Variables {
  name: String;
  born: number;
};

const AuthorForm: React.FC<AuthorFormProps> = ({ editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState<string | number >("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await editAuthor({
      variables: { name, born }
    })
    console.log('edit author...')
    setName('')
    setBorn("")
  }
  
  return (
    <div>
      <h2>Add birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number.parseInt(target.value))}
          />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  )
}

export default AuthorForm