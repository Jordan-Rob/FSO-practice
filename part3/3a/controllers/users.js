const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.post('/', async(request, response) => {
    const body = request.body

    noSalts = 10
    passwordHash = await bcrypt.hash(body.passwordHash, noSalts)

    const user = new User({
        username:body.username,
        name:body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter