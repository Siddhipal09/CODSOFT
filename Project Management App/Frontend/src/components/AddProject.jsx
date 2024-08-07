import React, { useState } from 'react';

const AddProject = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://codsoft-sk3w.onrender.com/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      if (res.ok) {
        const newProject = await res.json();
        setName('');
        setDescription('');
        alert('Project added successfully');
        onSubmit(newProject);
      } else {
        throw new Error('Error adding project');
      }
    } catch (error) {
      console.error('There was an error adding the project!', error);
    }
  };
  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <div className="my-4 w-96">
      <h2 className="text-xl font-bold mb-2">Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3"
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
        <div className='flex justify-between'>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Project
        </button>
        <button type="cancel" onClick={handleCancel} className="bg-blue-500 text-white px-4 py-2 rounded">
            Cancel
         </button>
         </div>
      </form>
    </div>
  );
};

export default AddProject;