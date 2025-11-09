import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Course } from '../types';
import CourseFormModal from './CourseFormModal';
import { TrashIcon, PencilSquareIcon, PlusCircleIcon } from './icons';

const AdminDashboard: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { courses, user } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const openAddModal = () => {
    setCourseToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setCourseToEdit(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCourseToEdit(null);
  };

  const handleDelete = (courseId: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch({ type: 'DELETE_COURSE', payload: courseId });
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-16 bg-gray-100 rounded-lg">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Access Denied</h1>
        <p className="text-xl text-gray-700">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Add New Course
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">ID: {course.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {course.category}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {course.type === 'Free' ? 'Free' : `$${course.price.toFixed(2)}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openEditModal(course)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <PencilSquareIcon className="h-5 w-5"/>
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5"/>
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
      
      {isModalOpen && (
        <CourseFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          courseToEdit={courseToEdit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
