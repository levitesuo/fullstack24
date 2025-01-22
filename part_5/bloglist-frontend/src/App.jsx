import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import NewBlogForm from './components/newBlogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({message:null, color:null})

  const notifyError = message => {
    setNotification({message, color:'red'})
    setTimeout(() => setNotification({message:null, color:null}), 5000)
  }

  const notify = message => {
    setNotification({message, color:'green'})
    setTimeout(() => setNotification({message:null, color:null}), 5000)
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

  const handleNewBlog = (blog) => {
    blogService.newBlog(blog)
    setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes))
  }

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id))
    blogService.deleteBlog(id)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      notify(user.name + ' successfully logged in')
    } catch (exception) {
      notifyError('Incerrect username or password')
    }
  }

  const handleLike = blogService.updateLikes

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    notify('logged out')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

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
          {loginForm()}
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