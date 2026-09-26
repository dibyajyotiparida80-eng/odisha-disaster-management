import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function AlertsFeed() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetchReports()

    const channel = supabase
      .channel('public:disaster_reports')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'disaster_reports'
        },
        (payload) => {
          if (payload.new.status === 'verified') {
            setReports((prev) => [payload.new, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('disaster_reports')
      .select('*')
      .eq('status', 'verified')
      .order('created_at', { ascending: false })

    if (!error) {
      setReports(data)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Live Verified Alerts</h2>

      {reports.length === 0 && (
        <p>No active alerts right now.</p>
      )}

      {reports.map((r) => (
        <div
          key={r.id}
          style={{
            border: '1px solid #ddd',
            padding: '1rem',
            marginBottom: '1rem'
          }}
        >
          <strong>{r.title}</strong>

          <p>
            {r.disaster_type} in {r.location}
          </p>

          <p>{r.description}</p>
        </div>
      ))}
    </div>
  )
}

export default AlertsFeed