import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import { PlusCircle, RefreshCw } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
        <Link 
          to="/tasks/new" 
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors"
        >
          <PlusCircle size={18} />
          <span>New Task</span>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 flex-col sm:flex-row ">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              filter === 'pending' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-md ${
              filter === 'in-progress' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'completed' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors`}
          >
            Completed
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-blue-600" size={32} />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600 mb-4">No tasks found</p>
          <Link 
            to="/tasks/new" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Create your first task
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;