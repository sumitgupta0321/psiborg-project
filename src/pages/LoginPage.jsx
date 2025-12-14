import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/LoginPage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }

    const success = login(username, password)
    if (success) {
      navigate('/products')
    } else {
      setError('Invalid credentials. Use username: "admin@gmail.com" and password: "admin"')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access the product catalog</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="login-hint">
            <p>Demo Credentials:</p>
            <p><strong>Username:</strong> admin@gmail.com</p>
            <p><strong>Password:</strong> admin</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
