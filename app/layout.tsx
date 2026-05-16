import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

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
      <body className={`${plusJakartaSans.variable} antialiased bg-bgLight text-textMain`}>
        {children}
      </body>
    </html>
  );
}