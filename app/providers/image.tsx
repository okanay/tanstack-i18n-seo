// app/providers/image-provider.tsx
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
  // Yüklenen görselleri takip eden set
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Görsel yüklendiğinde çağrılacak fonksiyon
  const markAsLoaded = (src: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(src);
      return newSet;
    });
  };

  // Görselin yüklenip yüklenmediğini kontrol eden fonksiyon
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

// Hook olarak kullanım için
export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
