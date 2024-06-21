const express = require('express');
const router = express.Router();
const { getProjects, createProject, deleteProject } = require('../controllers/projectController');

router.get('/', getProjects);
router.post('/', createProject);
router.delete('/:projectId', deleteProject);

module.exports = router;