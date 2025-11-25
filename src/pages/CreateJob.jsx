import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob } from '../api'

export default function CreateJob(){
  const [taskName, setTaskName] = useState('')
  const [payload, setPayload] = useState('{}')
  const [priority, setPriority] = useState('Low')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try{
      let parsedPayload
      try { parsedPayload = JSON.parse(payload) } catch (err){ alert('Payload must be valid JSON'); setLoading(false); return }

      const res = await createJob({ taskName, payload: parsedPayload, priority })
      alert('Job created: ' + res.data.jobId)
      navigate('/')
    }catch(err){ alert('Create failed: ' + (err.response?.data?.message || err.message)) }
    finally{ setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input value={taskName} onChange={e=>setTaskName(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Send daily report" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Payload (JSON)</label>
          <textarea value={payload} onChange={e=>setPayload(e.target.value)} rows={8} className="w-full border p-3 rounded code-box" />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading? 'Creating...' : 'Create Job'}</button>
          <button type="button" onClick={()=>{ setTaskName(''); setPayload('{}'); setPriority('Low') }} className="px-4 py-2 border rounded">Reset</button>
        </div>
      </form>
    </div>
  )
}
