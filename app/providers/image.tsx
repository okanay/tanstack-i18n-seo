import React, { createContext, useContext, useState } from "react";

interface ImageContextType {
  loadedImages: Set<string>;
  markAsLoaded: (src: string) => void;
  isLoaded: (src: string) => boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  // Set to track loaded images
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Function to call when an image is loaded
  const markAsLoaded = (src: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(src);
      return newSet;
    });
  };

  // Function to check if an image is loaded
  const isLoaded = (src: string) => {
    return loadedImages.has(src);
  };

  return (
    <ImageContext.Provider
      value={{
        loadedImages,
        markAsLoaded,
        isLoaded,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// For usage as a hook
export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
