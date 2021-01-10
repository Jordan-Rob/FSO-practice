const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

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