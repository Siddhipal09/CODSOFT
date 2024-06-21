import React, { useState } from 'react';

const AddTask = ({ projectId, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, title, description, deadline}),
      });
      if (res.ok) {
        const data = await res.json();
        onSubmit(data);
        setTitle('');
        setDescription('');
        setDeadline('');
        onCancel(); 
        alert('Task added successfully');
        
      } else {
        throw new Error('Error adding task');
      }
    } catch (error) {
      console.error('There was an error adding the task!', error);
      alert('Failed to add task. Please try again.');
    }
  };
  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3"
          ></textarea>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className='flex justify-between'>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
        <button type="cancel" onClick={handleCancel} className="bg-blue-500 text-white px-4 py-2 rounded">
            Cancel
         </button>
         </div>
      </form>
    </div>
  );
};

export default AddTask;
