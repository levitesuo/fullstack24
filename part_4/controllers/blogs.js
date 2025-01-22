const blogsRouter = require("express").Router()
const { request, response } = require("../app")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Blog = require("../models/blog")
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (body.likes === undefined) {
    body.likes = 0
  }
  if (!body.url || !body.title) {
    response.status(400).json()
  } else {

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      liked: body.likes,
      user: user.id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.deleteOne({_id: id})
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.find({_id: id}).populate('user')

  response.json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = {
    'likes': request.body.likes
  }

  const result = await Blog.findOneAndUpdate({_id: id}, blog, {new: true})
  response.json(result)
})

module.exports = blogsRouter;
