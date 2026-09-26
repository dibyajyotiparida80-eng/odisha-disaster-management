function Profile({ user }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Profile</h2>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>User ID:</strong> {user?.id}
      </p>

      <p>
        <strong>Account:</strong> Citizen
      </p>
    </div>
  )
}

export default Profile