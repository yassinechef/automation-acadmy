import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TrashIcon } from './icons';

const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { cart, isAuthenticated } = state;

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const total = cart.reduce((sum, item) => sum + item.course.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      dispatch({ type: 'CHECKOUT' });
    }
  };
  
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
      }
      dispatch({ type: 'SIGN_UP', payload: { name, email } });
    } else {
      if (!email || !password) {
        alert('Please fill all fields');
        return;
      }
      // Name is not used for sign-in in the current reducer logic, but we can keep the structure
      dispatch({ type: 'SIGN_IN', payload: { name: 'Demo User', email } });
    }
  };


  if (cart.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
        <p className="text-xl text-gray-700">Your cart is empty.</p>
        <p className="text-gray-600 mt-2">Explore the course catalog to find your next learning adventure!</p>
      </div>
    );
  }
  
  const CartItemsList = () => (
    <ul className="divide-y divide-gray-200">
      {cart.map(item => (
        <li key={item.course.id} className="p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center">
            <img src={item.course.imageUrl} alt={item.course.title} className="h-16 w-24 object-cover rounded-md mr-4 hidden sm:block" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.course.title}</h3>
              <p className="text-sm text-gray-600">{item.course.instructor}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-900 w-24 text-right">${item.course.price.toFixed(2)}</span>
            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.course.id })}
              className="ml-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Remove item"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  const OrderSummary = () => (
    <div className="bg-gray-50 p-6 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-xl font-medium text-gray-600">Total:</span>
        <span className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      
      {isAuthenticated ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <CartItemsList />
            <OrderSummary />
            <div className="p-6 bg-gray-50">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Auth Form */}
          <div>
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8">
              <div className="flex border-b border-gray-200 mb-6">
                <button onClick={() => setMode('signup')} className={`py-2 px-4 text-lg font-semibold transition-colors ${mode === 'signup' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                  Create Account
                </button>
                <button onClick={() => setMode('signin')} className={`py-2 px-4 text-lg font-semibold transition-colors ${mode === 'signin' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                  Sign In
                </button>
              </div>
              
              <form onSubmit={handleAuthSubmit} className="space-y-6">
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                  </div>
                )}
                <div>
                  <label htmlFor="email-auth" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email-auth" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div>
                  <label htmlFor="password-auth" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password-auth" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700">
                  {mode === 'signup' ? 'Sign Up & Continue' : 'Sign In & Continue'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Right Column: Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 p-6 border-b border-gray-200">Order Summary</h2>
              <CartItemsList />
              <OrderSummary />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
