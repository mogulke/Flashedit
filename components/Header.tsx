import React from 'react';
import { Aperture } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Aperture className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white tracking-tight">FlashEdit AI</h1>
              <p className="text-xs text-gray-400">Powered by Gemini 2.5</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block"
              onClick={(e) => e.preventDefault()}
            >
              Documentation
            </a>
            <div className="h-4 w-px bg-gray-700 hidden sm:block"></div>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-800">
              Beta
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
