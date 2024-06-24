import React from 'react'

import { Link } from 'react-router-dom';
const ProjectList = ({ projects, fetchProjects }) => {
  const handleDelete = async (projectId) => {
    try {
      await fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      fetchProjects(); 
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

   
  return (
    <div  className="max-w-6xl mx-auto px-4 py-8 grid gap-4">
       <h1 className="text-3xl font-bold mb-6">Projects</h1>
       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      
        {projects.map(project => (
          <div key={project._id} className=" relative bg-white rounded-lg shadow-lg overflow-hidden">
            <Link to={`/projects/${project._id}`} className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
            <div className="p-4">
            <h2 className="text-xl font-bold text-blue-500">{project.name}</h2>
           
            <p className="text-gray-700 mt-2">{project.description}</p>
            <p className="text-gray-500 mt-2">
              Created on: {new Date(project.createdAt).toLocaleDateString()}
            </p>
           
            </div>
            </Link>
            <button onClick={() => handleDelete(project._id)}  className="absolute bottom-2 right-2 p-2"> <img src="/delete.svg" alt="" className="w-6 h-6" /> </button>
          </div>
        ))}
      
      </div>
    </div>
  )
}

export default ProjectList
