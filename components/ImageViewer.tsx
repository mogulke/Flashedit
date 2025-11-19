import React from 'react';
import { Download, X, ArrowRight } from 'lucide-react';

interface ImageViewerProps {
  originalImage: string; // Object URL
  editedImage: string | null; // Base64 string (raw data)
  onReset: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImage, editedImage, onReset }) => {
  const handleDownload = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${editedImage}`;
    link.download = 'flashedit-generated.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-white font-medium text-lg">Preview</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onReset}
            className="text-gray-400 hover:text-white px-3 py-1.5 text-sm rounded-lg hover:bg-gray-800 transition-colors flex items-center"
          >
            <X size={16} className="mr-1.5" />
            Clear
          </button>
          {editedImage && (
            <button 
              onClick={handleDownload}
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 text-sm rounded-lg transition-colors flex items-center font-medium shadow-lg shadow-indigo-500/20"
            >
              <Download size={16} className="mr-1.5" />
              Download
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[400px]">
        {/* Original Image */}
        <div className="relative group rounded-2xl overflow-hidden border border-gray-700 bg-gray-800/50 flex items-center justify-center shadow-2xl">
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 border border-white/10">
            Original
          </div>
          <img 
            src={originalImage} 
            alt="Original" 
            className="max-w-full max-h-full object-contain p-2"
          />
        </div>

        {/* Result Image */}
        <div className="relative group rounded-2xl overflow-hidden border border-gray-700 bg-gray-800/50 flex items-center justify-center shadow-2xl">
          {editedImage ? (
            <>
              <div className="absolute top-4 left-4 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 border border-indigo-400/20 shadow-lg">
                Edited
              </div>
              <img 
                src={`data:image/png;base64,${editedImage}`} 
                alt="Edited" 
                className="max-w-full max-h-full object-contain p-2 transition-opacity duration-500 animate-in fade-in"
              />
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                <ArrowRight size={24} className="text-gray-600" />
              </div>
              <p className="text-sm font-medium">Output will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
