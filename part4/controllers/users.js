const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { username: 1, name: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.password === undefined || body.password.length < 3 ) {
    return response.status(400).json({ error: 'password missing or contain less then 3 characters' })
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  user.save()
    .then(savedUser=>{
      response.json(savedUser.toJSON())
    }).catch(error => next(error))
  
  
})


module.exports = usersRouter