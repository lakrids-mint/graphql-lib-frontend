import React, { useState } from 'react'

const AuthorForm = (props) => {
  console.log(props)
  const [name, setName] = useState('')
  const [born, setBorn] = useState("")
 

 /*  if (!props.show) {
    return null
  } */

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables: { name, born }
    })
    console.log('edit author...')

    setName('')
    setBorn('')
    
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