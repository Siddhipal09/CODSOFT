import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    useEffect(()=> {
        const fetchProjects = async() =>{
            const res = await fetch('http://localhost:3000/api/projects');
            const data = await res.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);
  return (
    <div  className="max-w-6xl mx-auto px-4 py-8 grid gap-4">
       <h1 className="text-3xl font-bold mb-6">Projects</h1>
       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      
        {projects.map(project => (
          <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Link to={`/projects/${project._id}`} className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
            <div className="p-4">
            <h2 className="text-xl font-bold text-blue-500">{project.name}</h2>
           
            <p className="text-gray-700 mt-2">{project.description}</p>
            <p className="text-gray-500 mt-2">
              Created on: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            </div>
            </Link>
          </div>
        ))}
      
      </div>
    </div>
  )
}

export default ProjectList
