import React from 'react'
import { useState, useEffect} from 'react';
import TaskList1 from '../components/TaskList1';
const PendingTasks = () => {
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

      const pendingTasks = data.filter(task => task.status === 'pending');
      console.log('Filtered pending tasks:', pendingTasks);
        setTasks(pendingTasks);
        setError(null);
    // setTasks(data.filter(task => task.status === 'pending'));
    }catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error.message);
      setTasks([]); 
    }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Pending Tasks</h2>
    {error && <p className="text-red-500">Error: {error}</p>}
    <TaskList1 tasks={tasks} setTasks={setTasks} />
  </div>
  )
}

export default PendingTasks
