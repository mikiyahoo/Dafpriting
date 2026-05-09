"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  ReactNode,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface StarLoaderProps {
  children: ReactNode;
}

export default function StarLoader({ children }: StarLoaderProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const starIconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const maskStarRef = useRef<SVGPolygonElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const animationStarted = useRef(false);

  const shouldRender = useSyncExternalStore(
    () => () => {},
    () => {
      if (pathname?.startsWith("/admin")) return false;
      return !sessionStorage.getItem("radiance_visited");
    },
    () => false
  );

  const startAnimation = useCallback(() => {
    if (animationStarted.current || !shouldRender) return;
    animationStarted.current = true;

    // Prevent body scroll during loader
    document.body.style.overflow = "hidden";

    // Set initial states
    gsap.set(starIconRef.current, { rotation: 0, opacity: 1, scale: 1 });
    gsap.set(contentRef.current, { filter: "blur(20px)" });
    gsap.set(maskStarRef.current, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        sessionStorage.setItem("radiance_visited", "true");
        setAnimationComplete(true);
      },
    });

    // Phase 1: Rotating star for 3 seconds
    tl.to(starIconRef.current, {
      rotation: 360,
      duration: 3,
      ease: "none",
    })
    // Phase 2: Star icon fades out
    .to(starIconRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    // Phase 3: Star cutout reveal using SVG mask expansion
    .to(
      maskStarRef.current,
      {
        scale: 80,
        duration: 2,
        ease: "power3.inOut",
      },
      "<"
    )
    // Phase 4: Blur transition on content
    .to(
      contentRef.current,
      {
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    )
    // Fade out overlay
    .to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      },
      "-=0.3"
    );
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    startAnimation();

    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldRender, startAnimation]);

  // If animation is complete or user has already visited, just render children
  if (!shouldRender || animationComplete) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Preloader Overlay with SVG Mask */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[10000] flex items-center justify-center"
        style={{ backgroundColor: "#1B2640" }}
      >
        {/* The Navy overlay with star-shaped mask cutout */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'url(#star-mask)',
            WebkitMaskImage: 'url(#star-mask)',
            backgroundColor: "#1B2640",
          }}
        />

        {/* Rotating Star Icon */}
        <div
          ref={starIconRef}
          className="relative z-10 w-24 h-24"
          style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))" }}
        >
          <Image
            src="/assets/Radiance Star Icon_color.svg"
            alt="Radiance Loading..."
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hidden SVG for mask definition */}
        <svg className="absolute w-0 h-0">
          <defs>
            <mask id="star-mask">
              {/* White = visible (navy shows), Black = transparent (content shows through) */}
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {/* Black star that expands to reveal content */}
              <polygon
                ref={maskStarRef}
                points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                fill="black"
                style={{ transformBox: "fill-box" }}
              />
            </mask>
          </defs>
        </svg>
      </div>

      {/* Content with initial blur */}
      <div ref={contentRef} style={{ filter: "blur(20px)" }}>
        {children}
      </div>
    </>
  );
}
