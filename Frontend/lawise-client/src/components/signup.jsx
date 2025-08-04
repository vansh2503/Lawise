import React, { useState, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authcontext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });
  const [status, setStatus] = useState({ loading: false, error: '', message: '' });
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', message: '' });
    try {
      const success = await signup(formData.name, formData.email, formData.password, formData.role);
      
      if (success) {
        setStatus({ loading: false, message: '🎉 You\'re all set! Account created.', error: '' });
        setFormData({ name: '', email: '', password: '', role: 'client' });
        
        // Show success message briefly before redirecting
        setTimeout(() => {
          // Redirect based on role
          if (formData.role === 'admin') navigate('/admin-dashboard');
          else if (formData.role === 'lawyer') navigate('/lawyer-dashboard');
          else navigate('/client-dashboard');
        }, 1500); // Wait 1.5 seconds so user can see the success message
      } else {
        setStatus({
          loading: false,
          message: '',
          error: 'Failed to create account. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message || 'Something went wrong. Try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white dark:bg-black">
      {/* Left side illustration / branding */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 bg-black text-white px-16 relative">
        <h1 className="text-4xl font-extrabold mb-4">Create your free account</h1>
        <p className="text-lg text-gray-300 mb-6">Explore Lawise’s best features designed for lawyers and clients.</p>
        <img
          src="https://github.githubassets.com/images/modules/signup/astrocat.png"
          alt="Signup illustration"
          className="w-2/3 object-contain mt-4"
        />
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Sign up to Lawise</h2>

        {status.message && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">{status.message}</div>}
        {status.error && <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">{status.error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Must be at least 8 characters.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full py-2 px-4 font-semibold text-white rounded-md transition ${
              status.loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status.loading ? 'Signing you up...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          Already a member? <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
