import { useEffect, useState } from 'react'

const Blog = ({ blog,likeHandler }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes ? blog.likes : 0)

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
    likeHandler(blog.id, blog.likes+1)
    blog.likes++
    setLikes(likes+1)
  }

  return (
    <div style={blogStyle}>
      <div  style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleInfo}>info</button>
      </div>  
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleInfo}>close</button>
        <ul>
          <li>author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>
            likes: {likes} 
            <button onClick={handleLike}>Like</button>
          </li>
          <li>user: {blog.user === undefined ? '---' : blog.user.username}</li>
        </ul>
      </div>
    </div>
  )
}

export default Blog