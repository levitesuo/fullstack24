const { test, after , beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { application } = require('express')

const api = supertest(app)

const initialBlogs = require('./blogs').map(({_id, __v, ...rest}) => ({...rest}))

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are correct amount of notes', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.lenght, initialBlogs.lenght)
})

test('a blog exsists with the title react patterns', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    
    assert(titles.includes('React patterns'))
})

test('api return blog objects with key id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
        assert(blog.hasOwnProperty('id'))
    })
})

test('POST request to blogs api adds a blog to the list', async () => {
    const blog = new Blog({'title': 'test blog', 'author': 'Leevi', 'likes':0, 'url': 'google.com'})

    await blog.save()

    const blogs = await api.get('/api/blogs')
    assert(blogs.body.length > initialBlogs.length)
})

test('POST request adds likes with the value of 0 if not specified', async () => {
    const blog = {'title': 'test blog', 'author': 'Leevi', 'url': 'google.com'}

    const response = await api.post('/api/blogs').send(blog)

    if (response._body.hasOwnProperty('likes')){
        assert.strictEqual(0, response._body.likes)
    } else {
        assert(false, 'POST didnt have likes in the response')
    }
})

test('POST no url gets bad request response', async () => {
    const blog = {'title': 'test blog', 'author': 'Leevi'} 

    const response = await api.post('/api/blogs').send(blog)

    assert(response.badRequest)
})

test('POST no title gets bad request response', async () => {
    const blog = {'author': 'Leevi', 'url': 'google.com'}

    const response = await api.post('/api/blogs').send(blog)

    assert(response.badRequest)
})


after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        const blogObject = Blog(blog)
        await blogObject.save()
    }
})