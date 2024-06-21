import { useState } from 'react'
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
  const [count, setCount] = useState();
  


  return (
  
     <Router>
      <Navbar/>
      <div className="flex">
      <Sidebar/>
      <div className="content flex-grow">
         <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<ProjectList />} />
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
