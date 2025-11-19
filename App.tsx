import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { PromptInput } from './components/PromptInput';
import { editImageWithGemini, fileToBase64 } from './services/geminiService';
import { ProcessingState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [editedImageBase64, setEditedImageBase64] = useState<string | null>(null);
  
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    error: null,
  });

  useEffect(() => {
    if (originalFile) {
      const url = URL.createObjectURL(originalFile);
      setOriginalPreviewUrl(url);
      // Reset edited state when new image is uploaded
      setEditedImageBase64(null);
      setProcessingState({ isProcessing: false, error: null });

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setOriginalPreviewUrl(null);
    }
  }, [originalFile]);

  const handleImageSelect = (file: File) => {
    setOriginalFile(file);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setEditedImageBase64(null);
    setProcessingState({ isProcessing: false, error: null });
  };

  const handleGenerate = async (prompt: string) => {
    if (!originalFile) return;

    setProcessingState({ isProcessing: true, error: null });

    try {
      const base64 = await fileToBase64(originalFile);
      const resultBase64 = await editImageWithGemini(base64, originalFile.type, prompt);
      setEditedImageBase64(resultBase64);
    } catch (err) {
      console.error(err);
      setProcessingState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : "An unexpected error occurred"
      }));
    } finally {
      setProcessingState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {processingState.error && (
          <div className="mb-6 bg-red-900/20 border border-red-900/50 text-red-200 px-4 py-3 rounded-lg flex items-center animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            <span>{processingState.error}</span>
            <button 
              onClick={() => setProcessingState(prev => ({ ...prev, error: null }))}
              className="ml-auto hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {!originalFile ? (
          <div className="mt-12 max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
                Transform Your Photos with AI
              </h2>
              <p className="text-lg text-gray-400">
                Upload an image and simply tell the AI what you want to change.
              </p>
            </div>
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            <div className="w-full h-[60vh] min-h-[500px]">
              <ImageViewer 
                originalImage={originalPreviewUrl!}
                editedImage={editedImageBase64}
                onReset={handleReset}
              />
            </div>
            
            <div className="w-full sticky bottom-6 z-40 mt-8">
               <PromptInput 
                 onGenerate={handleGenerate}
                 isProcessing={processingState.isProcessing}
               />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
