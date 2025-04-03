import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

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
  const [imageState, setImageState] = useState<ImageState>("idle");
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  console.log("run");

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageState("loading");
            // Görüldükten sonra direkt observer'ı temizle
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    } else {
      setIsInView(true);
      setImageState("loading");
    }
  }, [priority]);

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
        onLoad={() => {
          setImageState("loaded");
          onLoadingComplete?.();
        }}
        onError={() => setImageState("error")}
        {...props}
      />
    </figure>
  );
};
