const express = require('express');
const router = express.Router();
const { getTasks,getAllTasks, createTask, updateTaskById, getTaskById  } = require('../controllers/taskController');

router.get('/:projectId', getTasks);
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:taskId', updateTaskById);
router.get('/:taskId', getTaskById);

module.exports = router;