const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async ()=>{
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
        username: "avigdorMan",
        name: "avigdor mans",
        passwordHash
    })

    await user.save()

})


describe('users that shouldn\'t be created', ()=>{
    
    test('invalid users are not created', async ()=>{
        const usersAtStart = await helper.usersInDb()

        const noPasswordUser = {
            "username": "avidslndvlnlkd",
            "name": "avigdor mans",
            "password": ""
        }

        await api
            .post('/api/users')
            .send(noPasswordUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const noUsenameUser = {
            "username": "",
            "name": "avigdor mans",
            "password": "avig"
        }

        await api
            .post('/api/users')
            .send(noUsenameUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('ununique username shouldn\'t be created', async ()=>{
        const usersAtStart = await helper.usersInDb()

        const user = {
            "username": "avigdorMan",
            "name": "avigdor mans",
            "password": "avigdorM"
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})