import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daf Printing | Premium Printing Services",
  description:
    "Professional printing services — from business cards to banners. Get a free quote in minutes.",
  icons: {
    icon: "/assets/Radiance_Icon.svg",
    apple: "/assets/Radiance_Icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-secondary-white text-neutral-black">
        {children}
      </body>
    </html>
  );
}