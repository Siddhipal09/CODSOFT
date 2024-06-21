import React, { useState, useEffect } from 'react';

const EditTask = ({ taskId, onCancel,onTaskUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch task');
        }
        const task = await res.json();
        setTitle(task.title || '');
        setDescription(task.description || '');
        setDeadline(task.deadline ? task.deadline.split('T')[0] : ''); 
        setStatus(task.status || 'Pending');
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, deadline, status }),
      });
      if (res.ok) {
        alert('Task updated successfully');
       
        onTaskUpdated();
      } else {
        const errorMessage = await res.text(); 
      throw new Error(`Error updating task: ${errorMessage}`);
      }
    } catch (error) {
      console.error('There was an error updating the task!', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleCancel = () => {
    onCancel();
  };

 

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-2">Edit Task</h2>
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
        <div className="mb-2">
          <label className="block mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded w-full py-2 px-3"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className='flex justify-between'>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Task
          </button>
          <button type="button" onClick={handleCancel} className="bg-blue-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
