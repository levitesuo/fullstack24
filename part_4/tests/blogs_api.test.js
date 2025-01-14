const { test, after , beforeEach} = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const blogsData = require('./blogs')
const initialBlogs = blogsData.map(({_id, __v, ...rest}) => rest)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

beforeEach(() = {
    Blog.deleteMany({}).then(() => 
    initialBlogs.forEach((blog) => {
        let blogObj = new Blog(blog)
        blogObj.save()
    }))
})