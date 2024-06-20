import React, { useState, useEffect } from 'react';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`/api/tasks/${projectId}`);
      const data = await res.json();
      setTasks(data);
    };

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