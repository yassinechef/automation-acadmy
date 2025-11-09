import React, { useState, FormEvent, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { XMarkIcon, LogoIcon } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAppContext();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const user = { name: mode === 'signup' ? name : 'Demo User', email };
    if (mode === 'signup') {
      dispatch({ type: 'SIGN_UP', payload: user });
    } else {
      dispatch({ type: 'SIGN_IN', payload: user });
    }
    onClose();
    // Clear form
    setName('');
    setEmail('');
    setPassword('');
  };

  const toggleMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden border border-gray-700" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <LogoIcon className="h-8 w-8 text-blue-500" />
            <span className="ml-3 text-xl font-bold text-white">Automation Academy</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </header>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-gray-400 text-center mb-8">
            {mode === 'signin' ? 'Sign in to continue your learning journey.' : 'Join us to master the skills of tomorrow.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
            >
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} className="font-medium text-blue-400 hover:text-blue-300">
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;