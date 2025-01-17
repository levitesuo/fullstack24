const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('With one user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('passwrd', 10)
        const user = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creatin succeeds with a valid username', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'lepa',
            name: 'leevi',
            password: 'salis'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
    })

    test('creating a user with the same username fails', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'root',
            name: 'leevi',
            password: 'salis'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('creating a user with too short of a username fails', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'r',
            name: 'leevi',
            password: 'salis'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('creating a usern without username', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            name: 'leevi',
            password: 'salis'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })

    test('creating a user with a valid username, but too short of a password', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'rowan',
            name: 'leevi',
            password: 'd'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})