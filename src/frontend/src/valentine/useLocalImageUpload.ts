import { useState, useRef, useCallback } from 'react';

/**
 * useLocalImageUpload Hook
 * 
 * Manages local image file selection and preview using object URLs.
 * No backend interaction - purely client-side file handling.
 */
export function useLocalImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Revoke previous object URL to prevent memory leaks
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      
      // Create new object URL for preview
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }, [imageUrl]);

  // Trigger file input click
  const triggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Cleanup object URL on unmount
  const cleanup = useCallback(() => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  // Return input props for rendering
  const inputProps = {
    ref: fileInputRef,
    type: 'file' as const,
    accept: 'image/*',
    onChange: handleFileChange,
    style: { display: 'none' },
    'aria-label': 'Upload image',
  };

  return {
    imageUrl,
    triggerUpload,
    inputProps,
    cleanup,
  };
}
