import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Course, CartItem, User } from '../types';
import { useMockData } from '../hooks/useMockData';

interface AppState {
  courses: Course[];
  cart: CartItem[];
  myCourses: Course[];
  isAuthenticated: boolean;
  user: User | null;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Course }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'CHECKOUT' }
  | { type: 'SIGN_IN'; payload: User }
  | { type: 'SIGN_UP'; payload: User }
  | { type: 'SIGN_OUT' }
  | { type: 'ENROLL_FREE_COURSE'; payload: Course }
  | { type: 'ADD_COURSE'; payload: Omit<Course, 'id' | 'rating'> }
  | { type: 'UPDATE_COURSE'; payload: Course }
  | { type: 'DELETE_COURSE'; payload: number };

const initialState: AppState = {
  courses: useMockData(),
  cart: [],
  myCourses: [],
  isAuthenticated: false,
  user: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.course.id === action.payload.id);
      if (existingItem) {
        return state; // Prevent adding duplicates
      }
      return { ...state, cart: [...state.cart, { course: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART': {
      return { ...state, cart: state.cart.filter(item => item.course.id !== action.payload) };
    }
    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }
    case 'CHECKOUT': {
      if (!state.isAuthenticated) {
        alert("Please sign in to complete your purchase.");
        return state;
      }
      const newCourses = state.cart.map(item => ({...item.course, progress: Math.floor(Math.random() * 26)}));
      const existingCourseIds = new Set(state.myCourses.map(c => c.id));
      const uniqueNewCourses = newCourses.filter(c => !existingCourseIds.has(c.id));
      
      return {
        ...state,
        myCourses: [...state.myCourses, ...uniqueNewCourses],
        cart: [],
      };
    }
    case 'ENROLL_FREE_COURSE': {
      if (!state.isAuthenticated) {
        alert("Please sign in to enroll in this course.");
        return state;
      }
      const isAlreadyOwned = state.myCourses.some(c => c.id === action.payload.id);
      if (isAlreadyOwned) {
        return state;
      }
      const newCourse = { ...action.payload, progress: 0 };
      return {
        ...state,
        myCourses: [...state.myCourses, newCourse],
      };
    }
    case 'SIGN_IN': {
      const isAdmin = action.payload.email === 'admin@automation.academy';
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload, isAdmin },
      };
    }
    case 'SIGN_UP':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...initialState, // Reset state on sign out
        courses: state.courses, // Keep courses data on sign out
      };
    case 'ADD_COURSE': {
      const newCourse: Course = {
        ...action.payload,
        id: new Date().getTime(), // Simple unique ID generation
        rating: Math.round((Math.random() * 0.8 + 4.2) * 10) / 10, // Random rating 4.2-5.0
      };
      return {
        ...state,
        courses: [...state.courses, newCourse],
      };
    }
    case 'UPDATE_COURSE': {
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.id ? action.payload : course
        ),
      };
    }
    case 'DELETE_COURSE': {
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};