import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProjectList from './components/ProjectList';
import Home from './pages/Home';
import PendingTasks from './pages/PendingTasks';
import CompletedTasks from './pages/CompletedTasks';
import ProjectDetails from './pages/ProjectDetails';
import InProgress from './pages/InProgress';
import './App.css'

function App() {
  const [projects, setProjects] = useState([]);
 
 
   
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/projects'); 
        if (response.ok) {
          const data = await response.json();
          setProjects(data); 
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    
    useEffect(() => {
    fetchProjects(); 
  }, []);
  

  return (
  
     <Router>
      <Navbar fetchProjects={fetchProjects}/>
      <div className="flex">
      <Sidebar/>
      <div className="content flex-grow">
         <Routes>
            <Route path="/home" element={<Home fetchProjects={fetchProjects} projects={projects} />} />
            <Route path="/" element={<ProjectList projects={projects} fetchProjects={fetchProjects} />} />
            <Route path="/projects/:projectId" element={<ProjectDetails/>} />
            <Route path="/pending-tasks" element={<PendingTasks />} />
            <Route path="/completed-tasks" element={<CompletedTasks />} />
            <Route path="/in_progress" element={<InProgress />} />
           
          </Routes>
          </div>
          </div>
      </Router>
           
   
  )
}

export default App
