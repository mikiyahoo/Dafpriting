"use client";

import Link from "next/link";
import { NavLink } from "@/types";
import { cn } from "@/lib/utils";

const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Experiences", href: "/experiences" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

interface NavMenuProps {
  variant?: "light" | "dark";
  className?: string;
}

export function NavMenu({ variant = "dark", className }: NavMenuProps) {
  return (
    <nav className={cn("hidden md:flex items-center gap-8", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "relative inline-block text-sm font-medium tracking-wide uppercase transition-colors duration-300",
            {
              "text-radiance-white": variant === "light",
              "text-radiance-navy": variant === "dark",
            },
            "after:content-'' after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-secondary-light-brown after:transition-all after:duration-300 hover:after:w-full"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
