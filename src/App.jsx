import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import JobDetail from './pages/JobDetail'
import CreateJob from './pages/CreateJob'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Job Scheduler</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link to="/create" className="text-sm text-gray-600 hover:text-gray-900">Create Job</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/create" element={<CreateJob />} />
        </Routes>
      </main>
    </div>
  )
}