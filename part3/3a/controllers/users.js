const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()


userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content:1, important:1 })
    response.json(users)
})

userRouter.post('/', async(request, response) => {
    const body = request.body

    const noSalts = 10
    const passwordHash = await bcrypt.hash(body.password, noSalts)

    const user = new User({
        username:body.username,
        name:body.name,
        password:passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter