const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');

router.get('/:projectId', getTasks);
router.post('/', createTask);

module.exports = router;