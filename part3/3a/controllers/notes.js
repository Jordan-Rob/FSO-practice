const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


notesRouter.get('/', async (request, response) => {
    //response.json(notes)
    /*
    Note.find({}).then(notes => {
      response.json(notes)
    })
    */
   const notes = await Note.find({}).populate('user', { username:1, name:1})
   response.json(notes)

})



notesRouter.get('/:id', async (request, response) => {
    /*
    Note.findById(request.params.id).then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error))
    */
    
   const specificNote = await Note.findById(request.params.id)
   if(specificNote){
     response.json(specificNote)
   }else{
     response.status(404)
   }
    

})

notesRouter.delete('/:id', async (request, response) => {
    
    /*
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    */
    
   await Note.findByIdAndRemove(request.params.id)
   response.status(204).end()
})

/*
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
*/
notesRouter.post('/', async (request, response) => {
    const body = request.body  
    /*
    if (body.content === undefined ) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    */
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
      return response.status(401).json({
        error:"token missing or invalid"
      })
    }
    const user = await User.findById(decodedToken.id)

      const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user:user._id
      })
      
      /*
      note.save().then(savedNote => {
        return savedNote.toJSON()
      }).then( savedFormattedNote => {
        response.json(savedFormattedNote)
      }).catch( error => next(error))
      */

     const savedNote = await note.save()
     response.json(savedNote)
     user.notes = user.notes.concat(savedNote._id)
     await user.save()

})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content:body.content,
    important:body.important
  }

  /*
  Note.findByIdAndUpdate(request.params.id, note, { new:true })
    .then( updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
    */

   const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {new:true})
   response.json(updatedNote)
})

module.exports = notesRouter
