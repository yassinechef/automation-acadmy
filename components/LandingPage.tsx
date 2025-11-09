import React, { useState, useRef, MouseEvent } from 'react';
import { View } from '../types';
import { useAppContext } from '../context/AppContext';
import CourseCard from './CourseCard';
import { SparklesIcon, AcademicCapIcon, BriefcaseIcon, ChevronRightIcon } from './icons';

interface LandingPageProps {
  setCurrentView: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
  const { state } = useAppContext();
  const allCourses = state.courses;
  
  // Carousel drag-to-scroll logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    document.body.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = 'auto';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Drag speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const features = [
    {
      icon: <SparklesIcon className="h-10 w-10 text-purple-500" />,
      iconBg: 'bg-purple-100',
      title: 'Automation Experts',
      description: 'Get instant, personalized help 24/7 with our cutting-edge AI assistant, built to guide you through complex topics.'
    },
    {
      icon: <AcademicCapIcon className="h-10 w-10 text-blue-500" />,
      iconBg: 'bg-blue-100',
      title: 'Expert Instructors',
      description: 'Learn from the best. Our courses are taught by industry professionals with years of real-world experience and a passion for teaching.'
    },
    {
      icon: <BriefcaseIcon className="h-10 w-10 text-green-500" />,
      iconBg: 'bg-green-100',
      title: 'Career-Focused Learning',
      description: 'Gain practical, in-demand skills. Our curriculum is designed to prepare you for the challenges of today\'s job market.'
    }
  ];

  const testimonials = [
      {
          quote: "The PLC Programming course was a game-changer for my career. The AI tutor helped clarify complex concepts I struggled with for years.",
          name: "Alex Johnson",
          title: "Automation Technician"
      },
      {
          quote: "As an IT professional, staying current is crucial. The Cybersecurity course on Automation Academy was comprehensive, practical, and incredibly engaging.",
          name: "Samantha Lee",
          title: "DevOps Engineer"
      },
      {
          quote: "I never thought I could learn power electronics online, but the hands-on approach and clear explanations made it possible. Highly recommended!",
          name: "Michael Chen",
          title: "Electrical Engineering Student"
      }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Master the Skills of Tomorrow, Today.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
            Your journey to expertise in Industrial Automation, Electrical Engineering, and IT starts here. Powered by AI, driven by experts.
          </p>
          <button
            onClick={() => setCurrentView('catalog')}
            className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Explore Courses
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className={`${feature.iconBg} p-4 rounded-full mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-extrabold text-white">Featured Courses</h2>
          </div>
          
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex space-x-8 pb-4 -mx-4 px-4 overflow-x-auto cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allCourses.map(course => (
              <div key={course.id} className="w-80 md:w-96 flex-shrink-0">
                <CourseCard course={course} />
              </div>
            ))}
            <style>{`
              .flex.overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setCurrentView('catalog')}
              className="inline-flex items-center group transition-transform transform hover:scale-105"
            >
              <span className="bg-blue-600 p-3.5 rounded-l-md group-hover:bg-blue-700 transition-colors">
                <ChevronRightIcon className="h-5 w-5 text-white" />
              </span>
              <span className="bg-white text-gray-900 px-6 py-3 rounded-r-md font-semibold group-hover:bg-gray-200 transition-colors">
                Explore all courses
              </span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
              <h2 className="text-4xl font-extrabold text-white text-center mb-12">What Our Students Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-gray-700 p-8 rounded-xl shadow-lg flex flex-col">
                           <p className="text-gray-300 italic flex-grow">"{testimonial.quote}"</p>
                           <div className="mt-4 text-right">
                               <p className="font-bold text-white">{testimonial.name}</p>
                               <p className="text-sm text-blue-400">{testimonial.title}</p>
                           </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default LandingPage;