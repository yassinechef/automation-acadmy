import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Course } from '../types';
import AiTutor from './AiTutor';
import { SparklesIcon, PlayCircleIcon } from './icons';

interface MyCoursesProps {
  onGoToCourse: (course: Course) => void;
}

const MyCourses: React.FC<MyCoursesProps> = ({ onGoToCourse }) => {
  const { state } = useAppContext();
  const { myCourses, isAuthenticated } = state;
  const [activeTutorCourse, setActiveTutorCourse] = useState<Course | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16 bg-gray-100 rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">My Courses</h1>
        <p className="text-xl text-gray-700">Please sign in to view your courses.</p>
        <p className="text-gray-500 mt-2">Your learning dashboard awaits!</p>
      </div>
    );
  }

  if (myCourses.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-100 rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">My Courses</h1>
        <p className="text-xl text-gray-700">You haven't purchased any courses yet.</p>
        <p className="text-gray-500 mt-2">Your enrolled courses will appear here once you complete a purchase.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Learning Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-8 mb-12">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-xl">
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Stats</h2>
           <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-4xl font-bold text-blue-600">{myCourses.length}</p>
                <p className="text-gray-600">Courses Enrolled</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-4xl font-bold text-green-600">
                  {Math.round(myCourses.reduce((sum, c) => sum + (c.progress ?? 0), 0) / myCourses.length) || 0}%
                </p>
                <p className="text-gray-600">Avg. Completion</p>
              </div>
           </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Enrolled Courses</h2>
      <div className="space-y-6">
        {myCourses.map(course => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow">
              <img src={course.imageUrl} alt={course.title} className="h-20 w-32 object-cover rounded-md hidden sm:block"/>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500">By {course.instructor}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${course.progress ?? 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{course.progress ?? 0}% complete</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <button
                    onClick={() => onGoToCourse(course)}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    <PlayCircleIcon className="h-5 w-5 mr-2" />
                    Go to Course
                </button>
                <button
                    onClick={() => setActiveTutorCourse(course)}
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Ask AI Tutor
                </button>
            </div>
          </div>
        ))}
      </div>
      
      {activeTutorCourse && (
        <AiTutor course={activeTutorCourse} onClose={() => setActiveTutorCourse(null)} />
      )}
    </div>
  );
};

export default MyCourses;
