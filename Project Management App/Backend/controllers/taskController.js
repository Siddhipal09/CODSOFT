const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.projectId });
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