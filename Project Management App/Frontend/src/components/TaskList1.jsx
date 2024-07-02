import React, { useState, useEffect } from 'react';
import EditTask from '../components/EditTask';
const TaskList1 = ({ tasks, setTasks }) => {
 // const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); 
  const [editingTaskId, setEditingTaskId] = useState(null);

  
    const fetchTasks = async () => {
      try {
      const res = await fetch(`https://codsoft-sk3w.onrender.com/api/tasks`);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      setTasks(data);
      setError(null);
    }catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error.message); 
      setTasks([]);
    }
  }
  useEffect(() => {
    fetchTasks();
  }, [setTasks]);

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
  };
  

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const handleTaskUpdated = async () => {
    try {
      await fetchTasks(); 
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
 
  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {tasks.map(task => (
          <div key={task._id} className=" relative bg-white rounded-lg shadow-lg overflow-hidden">
             <div className="p-4">
            <h2 className="text-xl font-bold text-blue-500">{task.title}</h2>
            <p className="text-gray-700 mt-2">{task.description}</p>
            <p className="text-gray-500 mt-2">Assigned To: {task.assignedTo}</p>
            <p className="text-gray-500 mt-2">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            <p className="text-gray-500 mt-2">Status: {task.status}</p>
            <button
                  onClick={() => handleEditClick(task._id)}
                  className="absolute top-2 right-2 p-2"
                 
                >
                  <img src="/edit.svg" alt="Edit" className="w-6 h-6" /> 
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)} className="absolute bottom-2 right-2 p-2"><img src="./delete.svg" className="w-6 h-6" /></button>
            </div>
           
                 
            {editingTaskId === task._id && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <EditTask taskId={task._id} onCancel={handleCancel} onTaskUpdated={handleTaskUpdated} />
            </div>
            </div>
          )}
          
          </div>
         
        ))}
      </div>
      
      
    </div>
  );
};

export default TaskList1;