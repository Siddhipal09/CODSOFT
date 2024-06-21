import React from 'react'
import { useState, useEffect} from 'react';
import TaskList1 from '../components/TaskList1';
const InProgress = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); 
  
  useEffect(() => {
    const fetchTasks = async () => {
      try{
      const res = await fetch(`http://localhost:3000/api/tasks`);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      console.log('Fetched tasks:', data);

      const inprogressTasks = data.filter(task => task.status === 'in_progress');
      console.log('Filtered inprogress tasks:', inprogressTasks);
        setTasks(inprogressTasks);
        setError(null);
   // setTasks(data.filter(task => task.status === 'in_progress'));
    }catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); 
    }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">In Progress Tasks</h2>
    <TaskList1 tasks={tasks} setTasks={setTasks} />
  </div>
  )
}

export default InProgress
