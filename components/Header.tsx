import React from 'react';
import { useAppContext } from '../context/AppContext';
import { View } from '../types';
import { LogoIcon, CartIcon, BookOpenIcon, UserCircleIcon } from './icons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  openAuthModal: (mode: 'signin' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, openAuthModal }) => {
  const { state, dispatch } = useAppContext();
  const { cart, isAuthenticated, user } = state;
  const cartItemCount = cart.length;

  const navLinkClasses = (view: View) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      currentView === view
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
  
  const handleSignOut = () => {
    dispatch({ type: 'SIGN_OUT' });
    setCurrentView('landing'); // Redirect to landing page on sign out
  };

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('landing')}>
            <LogoIcon className="h-8 w-8 text-blue-500" />
            <span className="ml-3 text-xl font-bold text-white">Automation Academy</span>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#catalog" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); }} className={navLinkClasses('catalog')}>
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Course Catalog
            </a>
            {isAuthenticated && (
              <a href="#my-courses" onClick={(e) => { e.preventDefault(); setCurrentView('my-courses'); }} className={navLinkClasses('my-courses')}>
                My Courses
              </a>
            )}
            {isAuthenticated && user?.isAdmin && (
              <a href="#admin" onClick={(e) => { e.preventDefault(); setCurrentView('admin'); }} className={navLinkClasses('admin')}>
                Admin
              </a>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button onClick={() => setCurrentView('cart')} className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View shopping cart</span>
              <CartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full text-center text-xs font-medium text-white bg-red-600 ring-2 ring-gray-800">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center text-gray-300">
                    <UserCircleIcon className="h-6 w-6 mr-2"/>
                    <span className="text-sm font-medium">Hi, {user.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={handleSignOut} className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => openAuthModal('signin')} className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                    Sign In
                  </button>
                  <button onClick={() => openAuthModal('signup')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
       
       {/* Mobile Navigation & Auth */}
       <div className="md:hidden flex justify-around p-2 bg-gray-700 items-center">
          <a href="#catalog" onClick={(e) => { e.preventDefault(); setCurrentView('catalog'); }} className={navLinkClasses('catalog')}>
            Catalog
          </a>
          {isAuthenticated ? (
            <>
              <a href="#my-courses" onClick={(e) => { e.preventDefault(); setCurrentView('my-courses'); }} className={navLinkClasses('my-courses')}>
                My Courses
              </a>
              {user?.isAdmin && (
                 <a href="#admin" onClick={(e) => { e.preventDefault(); setCurrentView('admin'); }} className={navLinkClasses('admin')}>
                    Admin
                 </a>
              )}
              <button onClick={handleSignOut} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => openAuthModal('signin')} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Sign In</button>
              <button onClick={() => openAuthModal('signup')} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Sign Up</button>
            </>
          )}
        </div>
    </header>
  );
};

export default Header;