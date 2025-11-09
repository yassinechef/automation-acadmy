import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from './CourseCard';
import { Course } from '../types';
import { SearchIcon, XMarkIcon } from './icons';

type Level = Course['level'];
type Price = Course['type'];
type Category = Course['category'];

const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced'];
const PRICES: Price[] = ['Pro', 'Free'];
const CATEGORIES: Category[] = ['Industrial Automation', 'Electrical Engineering', 'IT'];

const CourseList: React.FC = () => {
  const { state } = useAppContext();
  const allCourses = state.courses;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<Price[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleLevelChange = (level: Level) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handlePriceChange = (price: Price) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLevels([]);
    setSelectedPrices([]);
    setSelectedCategories([]);
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const searchMatch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(course.level);
      const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(course.type);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.category);

      return searchMatch && levelMatch && priceMatch && categoryMatch;
    });
  }, [allCourses, searchQuery, selectedLevels, selectedPrices, selectedCategories]);

  const activeFiltersCount = (searchQuery ? 1 : 0) + selectedLevels.length + selectedPrices.length + selectedCategories.length;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            {activeFiltersCount > 0 && (
              <button onClick={resetFilters} className="text-sm text-blue-600 hover:text-blue-500">
                Reset All
              </button>
            )}
          </div>
          
          {/* Search Filter */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Skill Level Filter */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Skill Level</h4>
            <div className="space-y-2">
              {LEVELS.map(level => (
                <label key={level} className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => handleLevelChange(level)}
                    className="h-4 w-4 bg-white border-gray-300 rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-3">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Price</h4>
            <div className="space-y-2">
              {PRICES.map(price => (
                <label key={price} className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(price)}
                    onChange={() => handlePriceChange(price)}
                    className="h-4 w-4 bg-white border-gray-300 rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-3">{price === 'Pro' ? 'Pro Course' : 'Free Course'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Topics Filter */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Topics</h4>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <label key={category} className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 bg-white border-gray-300 rounded text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-3">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Course Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {activeFiltersCount > 0 && <span className="text-gray-500">Filtering by:</span>}
                    {searchQuery && (
                        <div className="flex items-center bg-blue-600 text-white text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                            "{searchQuery}"
                            <button onClick={() => setSearchQuery('')} className="ml-1.5 hover:bg-blue-700 rounded-full p-0.5">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    {selectedLevels.map(level => (
                         <div key={level} className="flex items-center bg-blue-600 text-white text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                            {level}
                            <button onClick={() => handleLevelChange(level)} className="ml-1.5 hover:bg-blue-700 rounded-full p-0.5">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    {selectedPrices.map(price => (
                         <div key={price} className="flex items-center bg-blue-600 text-white text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                            {price === 'Pro' ? 'Pro Course' : 'Free Course'}
                            <button onClick={() => handlePriceChange(price)} className="ml-1.5 hover:bg-blue-700 rounded-full p-0.5">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    {selectedCategories.map(cat => (
                         <div key={cat} className="flex items-center bg-blue-600 text-white text-sm font-medium pl-3 pr-2 py-1 rounded-full">
                            {cat}
                            <button onClick={() => handleCategoryChange(cat)} className="ml-1.5 hover:bg-blue-700 rounded-full p-0.5">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
                <p className="text-gray-500 text-sm">
                    Showing {filteredCourses.length} results of {allCourses.length} courses.
                </p>
            </div>
        </div>

        {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} theme="light" />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-gray-100 rounded-lg">
                <p className="text-xl text-gray-700">No courses found.</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default CourseList;