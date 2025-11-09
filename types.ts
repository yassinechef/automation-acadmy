// Fix: Removed self-import of 'Course' which was causing a naming conflict.

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  transcript: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  category: 'Industrial Automation' | 'Electrical Engineering' | 'IT';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Free' | 'Pro';
  instructor: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  progress?: number;
  modules?: Module[];
}

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export type View = 'landing' | 'catalog' | 'cart' | 'my-courses' | 'admin' | 'course-detail';
