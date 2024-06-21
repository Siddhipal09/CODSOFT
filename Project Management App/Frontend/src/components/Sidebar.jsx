import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        <li className="mb-2">
          <Link to="/home" className="hover:bg-gray-700 p-2 block rounded">Home</Link>
          <Link to="/completed-tasks" className="hover:bg-gray-700 p-2 block rounded">Completed Tasks</Link>
          <Link to="/pending-tasks" className="hover:bg-gray-700 p-2 block rounded">Pending Tasks</Link>
          <Link to="/in_progress" className="hover:bg-gray-700 p-2 block rounded">In Progress Tasks</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
