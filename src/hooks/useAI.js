"use client";
import { useState, useCallback } from 'react';

export function useAI() {
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imagesError, setImagesError] = useState('');

  const handleGenerateImages = useCallback(async () => {
    if (!desc.trim()) {
      setImagesError('Please enter a description for your craft idea');
      return;
    }

    if (desc.trim().length < 10) {
      setImagesError('Please provide a more detailed description (at least 10 characters)');
      return;
    }

    setImagesLoading(true);
    setImagesError('');

    try {
      const response = await fetch('/api/ai/generateImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: desc.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.images || !Array.isArray(data.images)) {
        throw new Error('Invalid response format from server');
      }

      setImages(data.images);
      
      // Clear any previous errors
      setImagesError('');
      
    } catch (error) {
      console.error('Error generating images:', error);
      setImagesError(error.message || 'Failed to generate images. Please try again.');
    } finally {
      setImagesLoading(false);
    }
  }, [desc]);

  const clearImages = useCallback(() => {
    setImages([]);
    setImagesError('');
    setDesc('');
  }, []);

  const addToDescription = useCallback((text) => {
    setDesc(prev => prev + (prev ? ', ' : '') + text);
  }, []);

  return {
    desc,
    setDesc,
    images,
    imagesLoading,
    imagesError,
    handleGenerateImages,
    clearImages,
    addToDescription, // Additional helper function
  };
}