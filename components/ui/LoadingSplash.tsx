"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface LoadingSplashProps {
  minimumLoadTime?: number;
}

export function LoadingSplash({ minimumLoadTime = 2000 }: LoadingSplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Logo with spinning border ring */}
      <div className="relative mb-8">
        {/* Spinning outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary border-r-secondary/60 animate-spin" style={{ width: 144, height: 144 }} />
        
        {/* Logo container */}
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          <Image
            src="/assets/daf-logo.png"
            alt="Daf Printing"
            width={80}
            height={80}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Brand name */}
      <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
        <span className="text-secondary">Daf</span> Printing
      </h1>
      <p className="text-white/60 text-sm md:text-base font-medium mb-10">
        Premium Printing Services
      </p>

      {/* Loading text */}
      <p className="text-white/40 text-xs animate-pulse">
        Loading...
      </p>
    </div>
  );
}