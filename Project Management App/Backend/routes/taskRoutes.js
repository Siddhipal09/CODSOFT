const express = require('express');
const router = express.Router();
const { getTasks,getAllTasks, createTask, updateTaskById, getTaskById, deleteTask } = require('../controllers/taskController');

router.get('/:projectId', getTasks);
router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:taskId', getTaskById);
router.put('/:taskId', updateTaskById);

router.delete('/:taskId', deleteTask);

module.exports = router;