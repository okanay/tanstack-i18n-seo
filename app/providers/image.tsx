// app/providers/image-provider.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";

interface ImageContextType {
  markAsLoaded: (src: string) => void;
  isLoaded: (src: string) => boolean;
  // Debug amaçlı - istersek buraya ref'i ekleyebiliriz
  loadedImagesRef?: React.MutableRefObject<Set<string>>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  // useState yerine useRef kullanarak re-render'ları önlüyoruz
  const loadedImagesRef = useRef<Set<string>>(new Set());

  // useCallback ile fonksiyonların yeniden oluşturulmasını önlüyoruz
  // ve fonksiyonların içindeki state değişiklikleri render'a sebep olmuyor
  const markAsLoaded = useCallback((src: string) => {
    if (!loadedImagesRef.current.has(src)) {
      loadedImagesRef.current.add(src);
    }
  }, []);

  const isLoaded = useCallback((src: string) => {
    return loadedImagesRef.current.has(src);
  }, []);

  // useMemo ile value'nun yeniden oluşturulmasını önlüyoruz
  const contextValue = React.useMemo(
    () => ({
      markAsLoaded,
      isLoaded,
      loadedImagesRef, // Debug için
    }),
    [markAsLoaded, isLoaded],
  );

  return (
    <ImageContext.Provider value={contextValue}>
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

// Bonus: Bir performans sürüm ölçen HOC (Higher Order Component)
export const withImageLoadTracking = <P extends object>(
  Component: React.ComponentType<P>,
  debugName?: string,
) => {
  const WrappedComponent = (props: P) => {
    const startTimeRef = useRef<number>(Date.now());
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
      if (!rendered) {
        setRendered(true);
        const loadTime = Date.now() - startTimeRef.current;
        console.log(
          `[Image Perf] ${debugName || "Component"} rendered in ${loadTime}ms`,
        );
      }
    }, [rendered]);

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withImageLoadTracking(${debugName || Component.displayName || "Component"})`;
  return WrappedComponent;
};
