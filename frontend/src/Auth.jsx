import { useState } from 'react'
import { supabase } from './supabaseClient'

function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Signup successful! You can now log in.')
        setIsSignUp(false)
      }
    } else {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (error) {
        setMessage(error.message)
      } else {
        onLogin(data.user)
      }
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>

      <form onSubmit={handleSubmit}>

        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <br />
            <br />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      <p
        onClick={() => {
          setIsSignUp(!isSignUp)
          setMessage('')
        }}
        style={{
          cursor: 'pointer',
          color: 'blue'
        }}
      >
        {isSignUp
          ? 'Already have an account? Log in'
          : "Don't have an account? Sign up"}
      </p>

      <p>{message}</p>
    </div>
  )
}

export default Auth