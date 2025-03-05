import mongoose from 'mongoose';
import Task from '../models/task.js';

// Get all taks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ creator: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the authenticated user
    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const task = req.body;
  
  try {
    const newTask = new Task({
      ...task,
      creator: req.userId
    });
    
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the authenticated user
    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      id, 
      { title, description, status }, 
      { new: true }
    );
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delte a tak
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check  task belongs to the authenticated user
    if (task.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }
    
    await Task.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};