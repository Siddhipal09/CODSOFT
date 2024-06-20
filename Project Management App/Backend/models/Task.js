const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    description: { type: String},
    deadline: { type: Date},
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;