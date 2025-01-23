import { useEffect, useState } from 'react'

const Blog = ({ blog,likeHandler,handleDelete }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const toggleInfo = () => {
    setInfoVisible(!infoVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    likeHandler(blog)
  }

  const DeleteButton = ({ handleDelete }) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogsappUser'))
    const isAuthor = blog.user?.username === loggedUser?.username
    return (
      <button
        style={{ display: isAuthor ? '' : 'none' }}
        onClick={() => handleDelete(blog.id)}
      >
      remove
      </button>
    )
  }

  return (
    <div className='blog'>
      <div style={blogStyle} >
        <div  style={hideWhenVisible}>
          {blog.title} {blog.author}
          <button onClick={toggleInfo} data-testid={'info '+blog.title}>info</button>
        </div>
        <div style={showWhenVisible} className='togglableContent' data-testid='togglableContent'>
          {blog.title} <button onClick={toggleInfo}>close</button>
          <ul>
            <li>author: {blog.author}</li>
            <li>url: {blog.url}</li>
            <li>
              likes: {blog.likes}
              <button onClick={handleLike} data-testid={'like ' + blog.title}>Like</button>
            </li>
            <li>user: {blog.user === undefined ? '---' : blog.user.username}</li>
          </ul>
          <DeleteButton handleDelete={handleDelete}/>
        </div>
      </div>
    </div>
  )
}

export default Blog