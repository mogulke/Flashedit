import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, FileWarning } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    onImageSelect(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center p-12 h-96 cursor-pointer group
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]' 
          : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-500'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />
      
      <div className={`p-4 rounded-full bg-gray-800 mb-6 transition-transform duration-300 group-hover:scale-110 ${isDragging ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}>
        {isDragging ? <Upload size={32} /> : <ImageIcon size={32} />}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2 text-center">
        {isDragging ? 'Drop image here' : 'Upload an image to start'}
      </h3>
      
      <p className="text-gray-400 text-center max-w-xs mx-auto mb-6">
        Drag and drop your photo here, or click to browse files.
        <span className="block text-xs mt-2 text-gray-500">Supports JPG, PNG, WEBP</span>
      </p>

      <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/25">
        Select Image
      </button>
    </div>
  );
};
