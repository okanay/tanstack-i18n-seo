// app/components/image.tsx
import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useImageContext } from "@/providers/image";

type ImageState = "idle" | "loading" | "loaded" | "error";
type ImageProps = React.ComponentProps<"img"> & {
  src: string;
  alt: string;
  placeholderSrc?: string;
  onLoadingComplete?: () => void;
  priority?: boolean;
};

export const Image = ({
  src,
  alt,
  placeholderSrc,
  className,
  onLoadingComplete,
  priority = false,
  ...props
}: ImageProps) => {
  const { isLoaded, markAsLoaded } = useImageContext();

  const initialState = isLoaded(src) ? "loaded" : "idle";
  const [imageState, setImageState] = useState<ImageState>(initialState);
  const [isInView, setIsInView] = useState(isLoaded(src) || priority);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const hasObserved = useRef(false);

  useEffect(() => {
    if (!isLoaded(src) || hasObserved.current) {
      return;
    }

    if (!priority && imgRef.current) {
      hasObserved.current = true;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageState("loading");
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    } else {
      setIsInView(true);
      setImageState(initialState === "loaded" ? "loaded" : "loading");
    }
  }, [priority, src, initialState, isLoaded]);

  const handleImageLoad = () => {
    setImageState("loaded");
    // Görsel yüklendiğini context'e bildir
    markAsLoaded(src);
    onLoadingComplete?.();
  };

  return (
    <figure
      role="img"
      aria-busy={imageState !== "loaded"}
      className={twMerge(
        "relative h-fit w-fit overflow-hidden transition-all duration-500",
        imageState !== "loaded" && "blur-[2px]",
      )}
    >
      <img
        ref={imgRef}
        className={twMerge("transition-opacity duration-500", className)}
        src={isInView || priority ? src : placeholderSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleImageLoad}
        onError={() => setImageState("error")}
        {...props}
      />
    </figure>
  );
};
