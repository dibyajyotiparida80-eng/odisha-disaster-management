import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './supabaseClient'

import Auth from './Auth'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import ReportForm from './pages/ReportForm'
import AlertsFeed from './pages/AlertsFeed'
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (!user) {
    return <Auth onLogin={setUser} />
  }

  return (
    <BrowserRouter>
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/report"
          element={<ReportForm user={user} />}
        />

        <Route
          path="/alerts"
          element={<AlertsFeed />}
        />

        <Route
          path="/profile"
          element={<Profile user={user} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App