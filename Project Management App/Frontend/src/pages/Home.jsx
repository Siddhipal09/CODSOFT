import React from 'react'
import { useEffect } from 'react';
import ProjectList from '../components/ProjectList';

const Home = ({ projects, fetchProjects }) => {
  
  useEffect(() => {
   
    fetchProjects();
  }, [fetchProjects]);
  return (
    <div>
     
      <ProjectList projects={projects} fetchProjects={fetchProjects} />
    </div>
  )
}

export default Home
