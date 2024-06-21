import React from 'react';
import { useState } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleAddTaskClick = () => {
    setIsFormVisible(true);
  }
  const handleFormSubmit = (task) => {
    console.log('New Task:', task);
    setIsFormVisible(false);
  };
  const handleCancel = () => {
    setIsFormVisible(false); 
  };
  return (
    <>
       <div className="px-4 flex justify-end">
        <button  onClick={handleAddTaskClick} className="bg-gray-100 text-black-500 border px-4 py-2 m-2 rounded">Add Task</button>
        </div>
    <div className="container mx-auto">
      <TaskList projectId={projectId} />
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