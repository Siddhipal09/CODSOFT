import React from 'react'
import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try{
      const res = await fetch(`http://localhost:3000/api/tasks`);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      setTasks(data.filter(task => task.status === 'Completed'));
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
    <TaskList tasks={tasks} />
  </div>
  )
}

export default CompletedTasks
