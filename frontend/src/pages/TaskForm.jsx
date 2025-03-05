import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Save, RefreshCw } from 'lucide-react';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
      const { title, description, status } = response.data;
      setFormData({ title, description, status });
    } catch (err) {
      setError('Failed to fetch task');
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title) {
      setError('Title is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      if (isEditMode) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, formData);
      }
      
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors disabled:bg-blue-400"
            >
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;