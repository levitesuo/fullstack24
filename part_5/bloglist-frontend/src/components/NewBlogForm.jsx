import { useState } from 'react'
import Togglable from './Togglable'

const NewBlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    const blog = { title, author, url }

    newBlog(blog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLable='new blog'>
      <form onSubmit={handleNewBlog}>
        <div>
                title
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                url
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </Togglable>
  )
}

export default NewBlogForm