
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Course, ChatMessage } from '../types';
import { sendMessageToTutor } from '../services/geminiService';
import { SparklesIcon, XMarkIcon, PaperAirplaneIcon } from './icons';

interface AiTutorProps {
  course: Course;
  onClose: () => void;
}

const AiTutor: React.FC<AiTutorProps> = ({ course, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Start with a clean slate for the streaming response
      const modelMessage: ChatMessage = { role: 'model', text: '' };
      setMessages(prev => [...prev, modelMessage]);

      const stream = sendMessageToTutor(course, [...messages, userMessage]);
      for await (const chunk of stream) {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            lastMessage.text += chunk;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error with Gemini API:', error);
      setMessages(prev => [
        ...prev,
        { role: 'model', text: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, course, messages]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden border border-gray-700">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center">
            <SparklesIcon className="w-8 h-8 text-purple-400 mr-3" />
            <div>
              <h2 className="text-xl font-bold text-white">AI Tutor</h2>
              <p className="text-sm text-gray-400">{course.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <XMarkIcon className="w-6 h-6 text-gray-400" />
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'model' && (
             <div className="flex justify-start">
               <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                <div className="flex items-center space-x-1">
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                </div>
               </div>
             </div>
           )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex items-center bg-gray-700 rounded-lg px-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask anything about this course..."
              className="w-full bg-transparent p-3 text-gray-200 placeholder-gray-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;
