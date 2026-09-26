import { useState } from 'react'
import { supabase } from '../supabaseClient'

function ReportForm({ user }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    disaster_type: 'flood',
    location: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    const { error } = await supabase
      .from('disaster_reports')
      .insert([
        {
          ...form,
          status: 'pending',
          reported_by: user?.id ?? null
        }
      ])

    if (error) {
      setMessage('Error: ' + error.message)
    } else {
      setMessage(
        'Report submitted. Our team will verify it shortly.'
      )

      setForm({
        title: '',
        description: '',
        disaster_type: 'flood',
        location: ''
      })
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Report a Disaster Incident</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <select
          name="disaster_type"
          value={form.disaster_type}
          onChange={handleChange}
        >
          <option value="flood">Flood</option>
          <option value="cyclone">Cyclone</option>
          <option value="fire">Fire</option>
          <option value="landslide">Landslide</option>
          <option value="other">Other</option>
        </select>

        <br />
        <br />

        <input
          name="location"
          placeholder="Location (village/district)"
          value={form.location}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Describe what happened"
          value={form.description}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">
          Submit Report
        </button>

      </form>

      <p>{message}</p>
    </div>
  )
}

export default ReportForm