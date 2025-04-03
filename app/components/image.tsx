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

  // Önbellekten yüklenen görseller için ilk state'i belirle
  const cachedImage = isLoaded(src);

  // Görsel durumu state'i
  const [imageState, setImageState] = useState<ImageState>(
    cachedImage ? "loaded" : "idle",
  );

  // Görsel görünür durumu
  const [isInView, setIsInView] = useState(cachedImage || priority);

  // Referanslar
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasSetupObserver = useRef(false);

  // Debug loglama fonksiyonu, bağımlılık dizisinden çıkarmak için useCallback ile
  const logDebug = useCallback(
    (message: string) => {
      if (debug) {
        console.log(`[Image] ${src.split("/").pop()}: ${message}`);
      }
    },
    [debug, src],
  );

  // Görsel yüklendiğinde çağrılan fonksiyon
  const handleImageLoad = useCallback(() => {
    logDebug("Yükleme tamamlandı");
    setImageState("loaded");
    markAsLoaded(src);
    onLoadingComplete?.();
  }, [logDebug, markAsLoaded, src, onLoadingComplete]);

  // Görsel hata verdiğinde çağrılan fonksiyon
  const handleImageError = useCallback(() => {
    logDebug("Yükleme HATASI");
    setImageState("error");
  }, [logDebug]);

  // İlk render işleminde ve öncelikli görseller için
  useEffect(() => {
    // Eğer görsel önbellekte varsa
    if (cachedImage) {
      logDebug("Önbellekten yüklendi");
      setImageState("loaded");
      setIsInView(true);
      return;
    }

    // Eğer öncelikli görsel ise veya önbellekte yoksa
    if (priority) {
      logDebug("Öncelikli görsel, hemen yüklenecek");
      setIsInView(true);
      setImageState("loading");
    }
  }, [cachedImage, priority, logDebug]);

  // IntersectionObserver kurulumu (öncelikli olmayan görseller için)
  useEffect(() => {
    // Eğer görsel öncelikli, önbellekte veya observer zaten kurulmuşsa
    if (
      priority ||
      cachedImage ||
      hasSetupObserver.current ||
      !imgRef.current
    ) {
      return;
    }

    // Observer'ı bir kez kurduğumuzu işaretleyelim
    hasSetupObserver.current = true;

    logDebug("IntersectionObserver başlatılıyor");

    // Observer'ı oluştur
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          logDebug("Görüntü alanında görünür oldu");
          setIsInView(true);
          setImageState("loading");

          // Görsel göründükten sonra observer'ı kaldır
          if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    // Görseli gözlemeye başla
    observerRef.current.observe(imgRef.current);

    // Cleanup fonksiyonu
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [priority, cachedImage, logDebug]);

  // Sadece debug amaçlı durum loglaması
  useEffect(() => {
    logDebug(
      `Durum: state=${imageState}, inView=${isInView}, cached=${cachedImage}`,
    );
  }, [imageState, isInView, cachedImage, logDebug]);

  return (
    <img
      ref={imgRef}
      aria-busy={imageState !== "loaded"}
      src={isInView || priority ? src : placeholderSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={handleImageLoad}
      onError={handleImageError}
      {...props}
    />
  );
};
