const blogsRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
const mongoose = require('mongoose')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body

  if (body.likes === undefined) {
    body.likes = 0
  }
  if (!body.url || !body.title) {
    response.status(400).json()
  } else {

    const blog = new Blog(body)
    
    const result = await blog.save()
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
  const result = await Blog.find({_id: id})

  response.json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = {
    'title': request.body.title,
    'author': request.body.author,
    'likes': request.body.likes
  }

  const result = await Blog.findOneAndUpdate({_id: id}, blog, {new: true})
  response.json(result)
})

module.exports = blogsRouter;
