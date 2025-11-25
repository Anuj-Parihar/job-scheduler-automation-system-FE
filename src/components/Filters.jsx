import React from 'react'

export default function Filters({status, priority, onChange}){
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm">Status</label>
        <select value={status} onChange={e => onChange({ status: e.target.value })} className="px-3 py-2 border rounded">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Priority</label>
        <select value={priority} onChange={e => onChange({ priority: e.target.value })} className="px-3 py-2 border rounded">
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  )
}