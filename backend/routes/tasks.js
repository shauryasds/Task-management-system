import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All rotes require authentication
router.use(auth);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;