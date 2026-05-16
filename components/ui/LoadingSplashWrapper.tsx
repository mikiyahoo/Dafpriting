"use client";

import dynamic from "next/dynamic";

const LoadingSplash = dynamic(
  () => import("@/components/ui/LoadingSplash").then((mod) => ({ default: mod.LoadingSplash })),
  { ssr: false }
);

export function LoadingSplashWrapper() {
  return <LoadingSplash minimumLoadTime={2000} />;
}