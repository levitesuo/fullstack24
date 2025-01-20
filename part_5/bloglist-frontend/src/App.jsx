import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  })

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    notify('logged out')
  }

  const handleNewBlog = (event) => {
    event.preventDefault()

    const blog = {title, author, url}

    blogService.newBlog(blog)

    notify('Blog: "' + title + '" successfully created.')

    setTitle('')
    setAuthor('')
    setUrl('')

    setBlogs(blogs.concat(blog))
  }

  const newBlogForm = () => (
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
  )

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
        {newBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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