import React from 'react';
import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleAddTaskClick = () => {
    setIsFormVisible(true);
  }
  const handleFormSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsFormVisible(false);
  };
  const handleCancel = () => {
    setIsFormVisible(false); 
  };
  const fetchTasks = async () => {
    try {
      const res = await fetch(`https://codsoft-sk3w.onrender.com/api/tasks`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        throw new Error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);
  return (
    <>
       <div className="px-4 flex justify-end">
        <button  onClick={handleAddTaskClick} className="bg-gray-100 text-black-500 border px-4 py-2 m-2 rounded">Add Task</button>
        </div>
    <div className="container mx-auto">
      <TaskList key={projectId} projectId={projectId} />
    </div>
    {isFormVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
      <AddTask onSubmit={handleFormSubmit} onCancel={handleCancel} projectId={projectId}/>
      </div>
      </div>
       )}
    </>
  );
};

export default ProjectDetail;