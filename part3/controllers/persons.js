const personssRouter = require('express').Router()
const Person = require('../models/person')

personssRouter.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

personssRouter.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch(error => next(error))
})

personssRouter.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body || !body.name || !body.number){
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person = new Person({
    'name': body.name,
    'number': body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    }).catch(error => next(error))
})

personssRouter.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(person => {
      person ? response.status(204).end() : response.status(404).end()
    })
    .catch(error => next(error))
})

personssRouter.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

personssRouter.get('/info', async (request, response) => {
  Allpersons = await Person.find({})
  response.send(`<div>Phonebook has info for ${Allpersons.length} people
   <br/> ${new Date()}</div>`)
})

module.exports = personssRouter