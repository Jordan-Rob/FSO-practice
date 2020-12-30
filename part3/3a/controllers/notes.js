const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', (request, response) => {
    //response.json(notes)
    Note.find({}).then(notes => {
      response.json(notes)
    })
})



notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response) => {
    
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/*
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
*/
notesRouter.post('/', (request, response, next) => {
    const body = request.body  
    /*
    if (body.content === undefined ) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    */
      const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
      })
      
      note.save().then(savedNote => {
        return savedNote.toJSON()
      }).then( savedFormattedNote => {
        response.json(savedFormattedNote)
      }).catch( error => next(error))

})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content:body.content,
    important:body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new:true })
    .then( updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

})

module.exports = notesRouter
