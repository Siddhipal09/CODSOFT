import React, { useState, useEffect } from 'react';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
      const res = await fetch(`http://localhost:3000/api/tasks/${projectId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      setTasks(data);
      setError(null);
    }catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error.message); // Set error message
      setTasks([]);
    }
  }

    fetchTasks();
  }, [projectId]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="mb-4">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;