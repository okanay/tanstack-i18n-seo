import { useState, useEffect, useRef, useCallback, memo } from "react";
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

// Image bileşenini memo ile sarmalıyoruz
export const Image = memo(
  ({
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
    const cachedImage = isLoaded(src);

    // Debug için mesaj sayısını sınırlandırmak için ref
    const lastLogTimeRef = useRef<number>(0);
    const logCountRef = useRef<{ [key: string]: number }>({});
    const initialRenderRef = useRef<boolean>(true);

    // Component mount olduğunda bir kez çalışacak
    const mountTimeRef = useRef<number>(Date.now());

    const [imageState, setImageState] = useState<ImageState>(
      cachedImage ? "loaded" : "idle",
    );

    // Görüntünün görünür olup olmadığını takip etmek için ref kullanıyoruz
    const isInViewRef = useRef<boolean>(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Debug log fonksiyonu - mesajları sınırlandırmak için optimize edildi
    const logDebug = useCallback(
      (message: string, data?: any, force: boolean = false) => {
        if (!debug) return;

        const now = Date.now();
        const messageKey = `${message}-${JSON.stringify(data || {})}`;

        // Mesaj sayacını artır
        logCountRef.current[messageKey] =
          (logCountRef.current[messageKey] || 0) + 1;

        // Çok sık mesaj göndermeyi önlemek için hız sınırlama
        // Force true ise her zaman gösteriyoruz
        const shouldLog =
          force ||
          initialRenderRef.current ||
          now - lastLogTimeRef.current > 1000 || // En fazla saniyede bir log
          logCountRef.current[messageKey] <= 2; // İlk iki kez her zaman log

        if (shouldLog) {
          const elapsedTime = now - mountTimeRef.current;

          console.group(
            `[Image Debug T+${elapsedTime}ms] ${src.split("/").pop()}`,
          );
          console.log("Message:", message);
          console.log("State:", {
            imageState,
            isInView: isInViewRef.current,
            isCached: cachedImage,
            isPriority: priority,
            isFirstRender: initialRenderRef.current,
            messageCount: logCountRef.current[messageKey],
          });

          if (data) {
            console.log("Additional Data:", data);
          }

          console.groupEnd();

          lastLogTimeRef.current = now;
        }
      },
      [debug, src, imageState, cachedImage, priority],
    );

    // Sadece yükleme durumu değiştiğinde render
    const handleImageLoad = useCallback(() => {
      if (imageState === "loading") {
        logDebug("Image loaded successfully", null, true); // Başarılı yükleme her zaman log
        setImageState("loaded");
        markAsLoaded(src);
        onLoadingComplete?.();
      }
    }, [logDebug, imageState, markAsLoaded, src, onLoadingComplete]);

    const handleImageError = useCallback(() => {
      if (imageState === "loading") {
        logDebug("Image loading failed", null, true); // Hata durumunu her zaman log
        setImageState("error");
      }
    }, [logDebug, imageState]);

    // IntersectionObserver kurulumu
    useEffect(() => {
      // İlk render'da yalnızca bir kez çalıştır
      if (!initialRenderRef.current) return;
      initialRenderRef.current = false;

      logDebug("Effect triggered", { trigger: "setup observer" });

      // Öncelikli veya önbellekte varsa gözlemci atla
      if (priority || cachedImage) {
        logDebug("Skipping observer setup - priority or cached");
        isInViewRef.current = true;
        setImageState("loading");
        return;
      }

      // Referans yoksa atla
      if (!imgRef.current) {
        logDebug("No image ref available");
        return;
      }

      // Var olan gözlemciyi temizle
      if (observerRef.current) {
        logDebug("Cleaning up existing observer");
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Tembel yükleme için IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          // Yalnızca görünürlük değiştiğinde log
          if (isInViewRef.current !== entry.isIntersecting) {
            logDebug(
              "IntersectionObserver callback",
              {
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio,
              },
              true,
            );
          }

          // Görünür hale gelirse yüklemeye başla
          if (!isInViewRef.current && entry.isIntersecting) {
            logDebug("Image in viewport - starting load", null, true);
            isInViewRef.current = true;
            setImageState("loading");
            observer.disconnect();
          }
        },
        {
          rootMargin: "100px", // Daha fazla ön yükleme marjı
          threshold: 0.1,
        },
      );

      logDebug("Setting up new IntersectionObserver");
      observer.observe(imgRef.current);
      observerRef.current = observer;

      // Temizleme fonksiyonu
      return () => {
        if (observerRef.current) {
          logDebug("Cleanup effect - disconnecting observer");
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    }, []); // Boş bağımlılık dizisi - sadece ilk render'da çalışır

    return (
      <img
        ref={imgRef}
        aria-busy={imageState !== "loaded"}
        src={
          isInViewRef.current || priority || cachedImage ? src : placeholderSrc
        }
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={className}
        {...props}
      />
    );
  },
);

// İsimlendirme için
Image.displayName = "LazyImage";
