import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-gray-600 flex justify-between  py-5">
        <Link to="/"className="text-white text-2xl px-4">ProjTrekker</Link>
        <div className="px-4">
        <button className="bg-white text-blue-500 px-4 py-2 rounded">Add Project</button>
        </div>
    </nav>
  )
}

export default Navbar

