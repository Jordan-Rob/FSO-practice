import React, {useState} from 'react';

const NoteForm = ({createNote}) => {
    const [newNote, setNewNote] = useState('')

    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: Math.random() > 0.5,
        })
        setNewNote('')
    }
    
    return (
      <form onSubmit = { addNote }>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form> 
    )
}

export default NoteForm