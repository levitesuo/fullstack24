import { useState } from 'react'

const LogInForm = ({ requestHandler , notify, notifyError, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await requestHandler({
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
      notifyError('Incorrect username or password')
    }
  }

  return  (
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
}

export default LogInForm