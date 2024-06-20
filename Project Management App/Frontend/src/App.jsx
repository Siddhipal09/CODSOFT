import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PendingTasks from './pages/PendingTasks';
import CompletedTasks from './pages/CompletedTasks';
import './App.css'

function App() {
  const [count, setCount] = useState();
  


  return (
  
     <Router>
      <Navbar/>
      <div className="flex">
      <Sidebar/>
         <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/pending-tasks" element={<PendingTasks />} />
            <Route path="/completed-tasks" element={<CompletedTasks />} />
          </Routes>
          </div>
      </Router>
           
   
  )
}

export default App
