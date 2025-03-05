import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, List, PlusCircle, UserCheck } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
        <p className="text-xl text-gray-600">A simple and efficient way to manage your tasks</p>
      </div>

      {!isAuthenticated ? (
        <div className="flex flex-col items-center space-y-6">
          <p className="text-lg text-gray-700">Get started by logging in or creating an account</p>
          <div className="flex flex-col md:flex-row gap-4 h-[30vh] w-full max-w-4xl justify-center items-center">
  <Link 
    to="/login" 
    className="flex items-center justify-center border-2 border-blue-500 hover:border-blue-600 h-16 w-64 text-blue-500 hover:text-blue-600 text-lg font-medium py-3 px-8 rounded-full transition-all duration-200 hover:bg-blue-50"
  >
    Login
  </Link>
  <Link 
    to="/register" 
    className="flex items-center justify-center border-2 border-green-500 hover:border-green-600 h-16 w-64 text-green-500 hover:text-green-600 text-lg font-medium py-3 px-8 rounded-full transition-all duration-200 hover:bg-green-50"
  >
    Register
  </Link>
</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/tasks" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <List className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">View Tasks</h2>
              <p className="text-gray-600">See all your current tasks</p>
            </div>
          </Link>
          
          <Link 
            to="/tasks/new" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <PlusCircle className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Create Task</h2>
              <p className="text-gray-600">Add a new task to your list</p>
            </div>
          </Link>
        </div>
      )}

     
    </div>
  );
};

export default Home;