import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listJobs, runJob } from '../api'
import Filters from '../components/Filters'

export default function Dashboard(){
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ status: '', priority: '' })
  const [error, setError] = useState(null)

  async function fetchJobs(){
    setLoading(true)
    try{
      const res = await listJobs(filters)
      setJobs(res.data)
    }catch(err){
      setError(err.message || 'Failed')
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchJobs() }, [filters])

  async function handleRun(id){
    try{
      await runJob(id)
      // optimistic update
      setJobs(prev => prev.map(j => j.id === Number(id) ? { ...j, status: 'running' } : j))
      // poll for status update after 4s
      setTimeout(fetchJobs, 3500)
    }catch(err){ alert('Run failed: ' + (err.response?.data?.message || err.message)) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <div className="text-sm text-gray-500">Backend: <span className="font-mono">{import.meta.env.VITE_API_URL || '/api'}</span></div>
      </div>

      <div className="mb-4">
        <Filters {...filters} onChange={(patch)=> setFilters(prev => ({...prev, ...patch}))} />
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Task Name</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="p-6 text-center">Loading...</td></tr>
            )}

            {!loading && jobs.length === 0 && (
              <tr><td colSpan={6} className="p-6 text-center">No jobs found</td></tr>
            )}

            {jobs.map(job => (
              <tr key={job.id} className="border-t">
                <td className="px-4 py-3">{job.id}</td>
                <td className="px-4 py-3">
                  <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline">{job.taskName}</Link>
                </td>
                <td className="px-4 py-3 text-center">{job.priority}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-sm ${job.status==='completed'? 'bg-green-100 text-green-800': job.status==='running'? 'bg-yellow-100 text-yellow-800': 'bg-gray-100 text-gray-800'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{new Date(job.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <button onClick={()=> handleRun(job.id)} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">Run Job</button>
                    <Link to={`/jobs/${job.id}`} className="px-3 py-1 border rounded text-sm">Details</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}

    </div>
  )
}