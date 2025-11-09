import React from 'react';
import { Course } from '../types';
import { useAppContext } from '../context/AppContext';
import { CartIcon, StarIcon, LogoIcon, AcademicCapIcon } from './icons';

interface CourseCardProps {
  course: Course;
  theme?: 'light' | 'dark';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, theme = 'dark' }) => {
  const { state, dispatch } = useAppContext();
  const isInCart = state.cart.some(item => item.course.id === course.id);
  const isOwned = state.myCourses.some(myCourse => myCourse.id === course.id);

  const handleAddToCart = () => {
    if (!isInCart && !isOwned) {
      dispatch({ type: 'ADD_TO_CART', payload: course });
    }
  };

  const handleEnrollFree = () => {
      if (!isOwned) {
          dispatch({ type: 'ENROLL_FREE_COURSE', payload: course });
      }
  };

  const getButtonState = () => {
    if (isOwned) {
      return { text: 'Owned', disabled: true, className: 'bg-green-600 cursor-not-allowed' };
    }
    if (isInCart) {
      return { text: 'In Cart', disabled: true, className: 'bg-yellow-600 cursor-not-allowed' };
    }
    return { text: 'Add to Cart', disabled: false, className: 'bg-blue-600 hover:bg-blue-700' };
  };

  const buttonState = getButtonState();
  const isLightTheme = theme === 'light';

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col ${isLightTheme ? 'bg-white border border-gray-200' : 'bg-gray-800'}`}>
      <div className="relative">
        <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
        <div className={`absolute top-3 left-3 p-1.5 rounded-full flex items-center justify-center ${isLightTheme ? 'bg-white/70' : 'bg-gray-900/60'}`}>
            <LogoIcon className="h-5 w-5 text-blue-500" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isLightTheme ? 'text-blue-600' : 'text-blue-400'}`}>{course.category}</span>
        <h3 className={`text-xl font-bold mt-2 mb-1 h-14 ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>{course.title}</h3>
        <p className={`text-sm mb-4 h-10 overflow-hidden ${isLightTheme ? 'text-gray-600' : 'text-gray-400'}`}>{course.description}</p>
        <div className={`flex justify-between items-center text-sm mt-auto ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
          <span>By {course.instructor}</span>
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
            <span>{course.rating}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-2xl font-bold ${isLightTheme ? 'text-gray-900' : 'text-white'}`}>
            {course.type === 'Free' ? 'Free' : `$${course.price.toFixed(2)}`}
          </span>
          {course.type === 'Free' ? (
            <button
              onClick={handleEnrollFree}
              disabled={isOwned}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isOwned ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} ${isLightTheme ? 'focus:ring-offset-white' : 'focus:ring-offset-gray-800'}`}
            >
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              {isOwned ? 'Enrolled' : 'Enroll for Free'}
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={buttonState.disabled}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${buttonState.className} ${isLightTheme ? 'focus:ring-offset-white' : 'focus:ring-offset-gray-800'}`}
            >
              <CartIcon className="h-5 w-5 mr-2" />
              {buttonState.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;