import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LogInForm from './components/LogInForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({ message:null, color:null })

  const notifyError = message => {
    setNotification({ message, color:'red' })
    setTimeout(() => setNotification({ message:null, color:null }), 5000)
  }

  const notify = message => {
    setNotification({ message, color:'green' })
    setTimeout(() => setNotification({ message:null, color:null }), 5000)
  }

  useEffect(() => {
    blogService.getAll().then(savedBlogs =>
      setBlogs( savedBlogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [setBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
    }
  }, [setUser])

  const handleNewBlog = async (blog) => {
    blogService.newBlog(blog)
    const newBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: {
        username: user.username
      }
    }
    setBlogs(blogs.concat(newBlog).sort((a, b) => b.likes - a.likes))
  }

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id))
    blogService.deleteBlog(id)
  }

  const handleLike = (id, likes) => {
    blogService.updateLikes(id, likes)
    const bbolgs = blogs.map(blog => {
      if (blog.id === id) {
        return {
          id: blog.id,
          author: blog.author,
          title: blog.title,
          url: blog.url,
          user: blog.user,
          likes: likes
        }} else {
        return blog
      }
    })
    console.log(bbolgs.map(blog => blog.title))
    setBlogs(bbolgs.sort((a, b) => b.likes - a.likes))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    notify('logged out')
  }

  const logoutButton = () => (
    <div>
      {user.name} logged in. <button onClick={handleLogout}>logout</button>
    </div>
  )

  const pageContent = () => {
    if (user === null) {
      return (
        <div>
          <h1>Login to blogsapp</h1>
          <LogInForm requestHandler={loginService.login} notify={notify} notifyError={notifyError} setUser={setUser} />
        </div>
      )
    } else {
      return (
        <div>
          <h1>blogs</h1>
          {logoutButton()}
          <h1>create new</h1>
          <NewBlogForm newBlog={handleNewBlog}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeHandler={handleLike} handleDelete={handleDelete}/>
          )}
        </div>
      )}
  }

  return (
    <div>
      {Notification(notification)}
      {pageContent()}
    </div>
  )
}

export default App