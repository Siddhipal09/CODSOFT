import React from 'react'
import { useState, useEffect} from 'react';
import TaskList1 from '../components/TaskList1';
const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try{
      const res = await fetch(`https://codsoft-sk3w.onrender.com/api/tasks`);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      console.log('Fetched tasks:', data);
      
     setTasks(data.filter(task => task.status === 'completed'));
    }catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); 
    }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
    <TaskList1 tasks={tasks} setTasks={setTasks} />
  </div>
  )
}

export default CompletedTasks
