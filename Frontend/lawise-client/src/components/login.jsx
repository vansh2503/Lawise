import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authcontext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    const success = await login(email, password);
    if (success) {
      const userData = JSON.parse(localStorage.getItem('user'));
      const role = userData.role;

      setStatus({ loading: false, message: '🎉 Logged in successfully!', error: '' });

      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'lawyer') navigate('/lawyer-dashboard');
      else navigate('/client-dashboard');
    } else {
      setStatus({ loading: false, error: '❌ Login failed. Please check your credentials.', message: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-white dark:bg-black">
      
      {/* Left Banner */}
      <div className="hidden lg:flex w-1/2 bg-black text-white px-16 py-20 flex-col justify-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome back to Lawise</h1>
        <p className="text-lg text-gray-300 mb-8">
          Access your dashboard, connect with clients or lawyers, and manage your legal work.
        </p>
        <img
          src="https://github.githubassets.com/images/modules/signup/astrocat.png"
          alt="Login illustration"
          className="w-3/4 object-contain mt-6"
        />
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 px-6 sm:px-12 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Log in to Lawise</h2>

        {status.message && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">{status.message}</div>
        )}
        {status.error && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">{status.error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-blue-600 dark:text-blue-400">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full py-2 font-semibold text-white rounded-md transition ${
              status.loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {status.loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
