import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskCard = ({ id, title, description, status, onDelete }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-yellow-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          <Link 
            to={`/tasks/edit/${id}`} 
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <Edit size={18} />
          </Link>
          <button 
            onClick={() => onDelete(id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center">
        <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${getStatusClass()}`}>
          {getStatusIcon()}
          <span className="capitalize">{status.replace('-', ' ')}</span>
        </span>
      </div>
    </div>
  );
};

export default TaskCard;