import '../styles/ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Oops! Something went wrong</h2>
      <p className="error-message">{message || 'An unexpected error occurred'}</p>
    </div>
  )
}

export default ErrorMessage
