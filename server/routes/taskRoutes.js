const express = require('express');
const { createTask, getTasks, updateTask, deleteTask, markAsDone, getTaskById} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById); 
router.put('/:id', authMiddleware, updateTask); 
router.patch('/:id', authMiddleware, markAsDone);
router.delete('/:id', authMiddleware, deleteTask); 

module.exports = router;
