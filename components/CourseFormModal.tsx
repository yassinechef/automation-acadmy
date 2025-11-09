import React, { useState, FormEvent, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Course } from '../types';
import { XMarkIcon } from './icons';

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseToEdit: Course | null;
}

const initialState: Omit<Course, 'id' | 'rating' | 'progress'> = {
  title: '',
  category: 'Industrial Automation',
  level: 'Beginner',
  type: 'Pro',
  instructor: '',
  description: '',
  price: 99.99,
  imageUrl: 'https://picsum.photos/seed/newcourse/600/400',
};

const CourseFormModal: React.FC<CourseFormModalProps> = ({ isOpen, onClose, courseToEdit }) => {
  const { dispatch } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const isEditMode = courseToEdit !== null;

  const formElementClasses = "mt-1 block w-full bg-white border border-gray-800 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500";


  useEffect(() => {
    if (isEditMode) {
      setFormData(courseToEdit);
    } else {
      setFormData(initialState);
    }
  }, [courseToEdit, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as 'Free' | 'Pro';
    setFormData(prev => ({
        ...prev,
        type,
        price: type === 'Free' ? 0 : prev.price === 0 ? 99.99 : prev.price,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch({ type: 'UPDATE_COURSE', payload: formData as Course });
    } else {
      dispatch({ type: 'ADD_COURSE', payload: formData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">{isEditMode ? 'Edit Course' : 'Add New Course'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </header>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={formElementClasses} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" id="category" value={formData.category} onChange={handleChange} className={formElementClasses}>
                <option>Industrial Automation</option>
                <option>Electrical Engineering</option>
                <option>IT</option>
              </select>
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
              <select name="level" id="level" value={formData.level} onChange={handleChange} className={formElementClasses}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <select name="type" id="type" value={formData.type} onChange={handleTypeChange} className={formElementClasses}>
                    <option value="Pro">Pro</option>
                    <option value="Free">Free</option>
                </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" disabled={formData.type === 'Free'} className={`${formElementClasses} disabled:bg-gray-200 disabled:text-gray-500`} />
            </div>
          </div>
          <div>
            <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Instructor</label>
            <input type="text" name="instructor" id="instructor" value={formData.instructor} onChange={handleChange} required className={formElementClasses} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className={formElementClasses}></textarea>
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className={formElementClasses} />
          </div>
        </form>

        <footer className="p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">{isEditMode ? 'Save Changes' : 'Create Course'}</button>
        </footer>
      </div>
    </div>
  );
};

export default CourseFormModal;