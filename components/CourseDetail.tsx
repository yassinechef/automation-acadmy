import React, { useState } from 'react';
import { Course, Lesson, View } from '../types';
import AiTutor from './AiTutor';
import { SparklesIcon, ChevronLeftIcon, BookOpenIcon, PlayCircleIcon } from './icons';

interface CourseDetailProps {
  course: Course;
  setCurrentView: (view: View) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, setCurrentView }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(course.modules?.[0]?.lessons?.[0] || null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  if (!course.modules || course.modules.length === 0) {
    return (
      <div className="text-center py-16 bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Course Content Not Available</h1>
        <p className="text-gray-600 mt-2">Content for this course is coming soon.</p>
        <button
          onClick={() => setCurrentView('my-courses')}
          className="mt-4 flex items-center justify-center mx-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <button onClick={() => setCurrentView('my-courses')} className="flex items-center text-sm font-semibold text-blue-600 hover:underline mb-2">
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </button>
          <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
          <p className="text-xs text-gray-500">{totalLessons} lessons</p>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul>
            {course.modules.map((module) => (
              <li key={module.id}>
                <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 border-t border-b border-gray-200">{module.title}</h3>
                <ul>
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${activeLesson?.id === lesson.id ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-200'}`}
                      >
                         <PlayCircleIcon className={`h-5 w-5 flex-shrink-0 ${activeLesson?.id === lesson.id ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className="flex-grow">{lesson.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-8 md:p-12 bg-white overflow-y-auto">
        {activeLesson ? (
          <div>
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 flex-grow">{activeLesson.title}</h1>
              <button
                onClick={() => setIsTutorOpen(true)}
                className="flex-shrink-0 ml-4 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                Ask AI Tutor
              </button>
            </div>

            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6 shadow-2xl">
              <iframe
                className="w-full h-full"
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Transcript & Notes</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{activeLesson.transcript}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <BookOpenIcon className="h-16 w-16 text-gray-300 mb-4" />
             <h1 className="text-2xl font-bold text-gray-800">Welcome to {course.title}</h1>
             <p className="text-gray-600 mt-2">Select a lesson from the sidebar to begin your learning journey.</p>
          </div>
        )}
      </main>

      {isTutorOpen && (
        <AiTutor course={course} onClose={() => setIsTutorOpen(false)} />
      )}
    </div>
  );
};

export default CourseDetail;
