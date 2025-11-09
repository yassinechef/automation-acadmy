import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import CourseList from './components/CourseList';
import ShoppingCart from './components/ShoppingCart';
import MyCourses from './components/MyCourses';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import { View, Course } from './types';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import CourseDetail from './components/CourseDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' as 'signin' | 'signup' });

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  const handleGoToCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };


  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage setCurrentView={navigateTo} />;
      case 'catalog':
        return <CourseList />;
      case 'cart':
        return <ShoppingCart />;
      case 'my-courses':
        return <MyCourses onGoToCourse={handleGoToCourse} />;
      case 'admin':
        return <AdminDashboard />;
      case 'course-detail':
        if (selectedCourse) {
          return <CourseDetail course={selectedCourse} setCurrentView={navigateTo} />;
        }
        // Fallback
        setCurrentView('my-courses');
        return <MyCourses onGoToCourse={handleGoToCourse} />;
      default:
        return <LandingPage setCurrentView={navigateTo} />;
    }
  };

  const isFullWidthPage = currentView === 'landing' || currentView === 'course-detail';
  const themeClasses = currentView === 'landing'
    ? 'bg-gray-900 text-gray-100'
    : 'bg-white text-gray-900';

  return (
    <AppProvider>
      <div className={`min-h-screen flex flex-col font-sans ${themeClasses}`}>
        <Header 
          currentView={currentView} 
          setCurrentView={navigateTo} 
          openAuthModal={openAuthModal}
        />
        <main className="flex-grow">
          {isFullWidthPage ? renderView() : (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderView()}
            </div>
          )}
        </main>
        {currentView !== 'course-detail' && <Footer />}
      </div>
      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialMode={authModal.mode}
      />
    </AppProvider>
  );
};

export default App;
