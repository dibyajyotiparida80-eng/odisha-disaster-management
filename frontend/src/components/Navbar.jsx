import { Link } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        borderBottom: '1px solid #ccc'
      }}
    >
      <Link to="/">Home</Link>

      <Link to="/report">Report an Incident</Link>

      <Link to="/alerts">Live Alerts</Link>

      <Link to="/profile">Profile</Link>

      <span style={{ marginLeft: 'auto' }}>
        {user?.email}{' '}
        <button onClick={onLogout}>
          Log Out
        </button>
      </span>
    </nav>
  )
}

export default Navbar