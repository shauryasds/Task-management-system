import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-purple-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <CheckSquare size={24} />
            <span>Task Manager</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/tasks" className="hover:text-blue-200 transition-colors">
                  Tasks
                </Link>
                <Link to="/tasks/new" className="hover:text-blue-200 transition-colors">
                  New Task
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors"
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;