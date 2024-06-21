const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.createTask = async (req, res) => {
   // const task = new Task(req.body);
   const{projectId, title, description, deadline} = req.body;
    try {
        const newTask = new Task({ projectId, title, description, deadline})
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else{
        res.status(400).json({ message: err.message });
        }
    }
};

exports.updateTaskById = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, deadline, status } = req.body; // Include status if you want to update it
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, deadline, status },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  //getting task by task id
  exports.getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  