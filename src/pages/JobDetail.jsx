import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJob } from '../api'

export default function JobDetail(){
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try{
        const res = await getJob(id)
        setJob(res.data)
      }catch(err){ console.error(err) }
      finally{ setLoading(false) }
    }
    load()
  }, [id])

  if(loading) return <div>Loading...</div>
  if(!job) return <div>Job not found</div>

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Job #{job.id} · {job.taskName}</h2>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <div className="text-sm text-gray-500">Status</div>
          <div className="text-lg">{job.status}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Priority</div>
          <div className="text-lg">{job.priority}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Created At</div>
          <div className="text-lg">{new Date(job.createdAt).toLocaleString()}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-2">Payload</div>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto code-box">{JSON.stringify(job.payload, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}