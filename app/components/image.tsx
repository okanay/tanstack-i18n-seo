import { useState, useEffect, useRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { useImageContext } from "@/providers/image";

type ImageState = "idle" | "loading" | "loaded" | "error";
type ImageProps = React.ComponentProps<"img"> & {
  src: string;
  alt: string;
  placeholderSrc?: string;
  onLoadingComplete?: () => void;
  priority?: boolean;
  debug?: boolean;
};

export const Image = ({
  src,
  alt,
  placeholderSrc,
  className,
  onLoadingComplete,
  priority = false,
  debug = false,
  ...props
}: ImageProps) => {
  const { isLoaded, markAsLoaded } = useImageContext();

  // Set initial state for images loaded from cache
  const cachedImage = isLoaded(src);

  // Image state
  const [imageState, setImageState] = useState<ImageState>(
    cachedImage ? "loaded" : "idle",
  );

  // Image visibility state
  const [isInView, setIsInView] = useState(cachedImage || priority);

  // References
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasSetupObserver = useRef(false);

  // Debug logging function, using useCallback to remove from dependency array
  const logDebug = useCallback(
    (message: string) => {
      if (debug) {
        console.log(`[Image] ${src.split("/").pop()}: ${message}`);
      }
    },
    [debug, src],
  );

  // Function called when the image is loaded
  const handleImageLoad = useCallback(() => {
    logDebug("Loading complete");
    setImageState("loaded");
    markAsLoaded(src);
    onLoadingComplete?.();
  }, [logDebug, markAsLoaded, src, onLoadingComplete]);

  // Function called when the image fails to load
  const handleImageError = useCallback(() => {
    logDebug("Loading ERROR");
    setImageState("error");
  }, [logDebug]);

  // On initial render and for priority images
  useEffect(() => {
    // If the image is in the cache
    if (cachedImage) {
      logDebug("Loaded from cache");
      setImageState("loaded");
      setIsInView(true);
      return;
    }

    // If the image is a priority or not in the cache
    if (priority) {
      logDebug("Priority image, loading immediately");
      setIsInView(true);
      setImageState("loading");
    }
  }, [cachedImage, priority, logDebug]);

  // IntersectionObserver setup (for non-priority images)
  useEffect(() => {
    // If the image is priority, in cache, or observer is already set up
    if (
      priority ||
      cachedImage ||
      hasSetupObserver.current ||
      !imgRef.current
    ) {
      return;
    }

    // Mark that the observer has been set up once
    hasSetupObserver.current = true;

    logDebug("Starting IntersectionObserver");

    // Create the observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          logDebug("Became visible in viewport");
          setIsInView(true);
          setImageState("loading");

          // Remove the observer after the image becomes visible
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    // Start observing the image
    observerRef.current.observe(imgRef.current);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [priority, cachedImage, logDebug]);

  // State logging for debug purposes only
  useEffect(() => {
    logDebug(
      `State: state=${imageState}, inView=${isInView}, cached=${cachedImage}`,
    );
  }, [imageState, isInView, cachedImage, logDebug]);

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
        onError={handleImageError}
        {...props}
      />

      {debug && imageState === "loading" && (
        <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black text-xs text-white">
          Loading...
        </div>
      )}

      {debug && imageState === "error" && (
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-red-500 text-xs text-white">
          Error!
        </div>
      )}
    </figure>
  );
};
