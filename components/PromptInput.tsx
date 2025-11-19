import React, { useState } from 'react';
import { Wand2, Send } from 'lucide-react';
import { Button } from './Button';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isProcessing: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isProcessing }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      onGenerate(prompt.trim());
    }
  };

  const suggestions = [
    "Make it look like a vintage photo",
    "Remove the background",
    "Add a cyberpunk neon effect",
    "Turn this into a pencil sketch"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-gray-900 rounded-xl p-2 border border-gray-700 focus-within:border-indigo-500 transition-colors shadow-xl">
            <div className="pl-3 pr-2 text-indigo-400">
              <Wand2 size={20} />
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how you want to edit the image..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-lg h-12"
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              disabled={!prompt.trim() || isProcessing}
              isLoading={isProcessing}
              className="rounded-lg h-10 px-6"
            >
              Generate
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium self-center mr-2">Try:</span>
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => setPrompt(suggestion)}
            disabled={isProcessing}
            className="text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white border border-gray-700 rounded-full px-3 py-1.5 transition-colors disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
