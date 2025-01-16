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
    const blog = {'title': 'test blog', 'author': 'Leevi', 'likes':0, 'url': 'google.com'}

    await api.post('/api/blogs').send(blog)

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
    assert.strictEqual(400, response.status)
})

test('DELETE request works when its blog thats delted exsists', async () => {
    const getResponse = await api.get('/api/blogs')
    const blogs = getResponse.body

    const id = blogs[0].id

    const deleteResponse = await api.delete('/api/blogs/' + id)

    assert.strictEqual(204, deleteResponse.status)
})

test('PUT request works when its supposed to', async () => {
    const blog = {'title': 'test blog', 'author': 'Leevi', 'likes':0, 'url': 'google.com'}

    const postResult = await api.post('/api/blogs').send(blog)
    const id  = postResult.body.id


    const blogUpdates = {
        'author': 'myy'
    }
    const putResult = await api.put('/api/blogs/'+id).send(blogUpdates)
    const resultBlog = putResult.body

    const expectedBlog = {
        'author': 'myy',
        'title': 'test blog',
        'likes': 0,
        'url': 'google.com',
        'id': id
    }

    assert.deepStrictEqual(expectedBlog, resultBlog)
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