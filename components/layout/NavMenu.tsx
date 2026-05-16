"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

const navItems: NavItem[] = [
  {
    label: "About",
    dropdown: [
      { label: "Who We Are", href: "/about" },
      { label: "Why Radiance", href: "/about/why-radiance" },
      { label: "Our Team", href: "/about/team" },
    ],
  },
  {
    label: "What We Do",
    dropdown: [
      { label: "Weddings", href: "/services?category=wedding" },
      { label: "Social Events", href: "/services?category=social" },
      { label: "Destination Events", href: "/services?category=destination" },
      { label: "Corporate Events", href: "/services?category=corporate" },
      { label: "Consulting & Branding", href: "/services?category=consulting" },
      { label: "Packages", href: "/packages" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Packages",
    href: "/packages",
  },
];

interface NavMenuProps {
  variant?: "light" | "dark";
  className?: string;
}

export function NavMenu({ variant = "dark", className }: NavMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav
      ref={dropdownRef}
      className={cn("hidden md:flex items-center gap-1", className)}
    >
      {navItems.map((item) => {
        const isActive = openDropdown === item.label;
        const hasDropdown = !!item.dropdown;

        return (
          <div key={item.label} className="relative">
            {hasDropdown ? (
              <button
                onClick={() => handleDropdownClick(item.label)}
                onMouseEnter={() => setOpenDropdown(item.label)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 rounded-none",
                  "after:content-[''] after:absolute after:left-4 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary-light-brown after:transition-all after:duration-300 hover:after:w-[calc(100%-32px)]",
                  {
                    "text-radiance-white": variant === "light",
                    "text-radiance-navy": variant === "dark",
                  }
                )}
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300",
                  "after:content-[''] after:absolute after:left-4 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary-light-brown after:transition-all after:duration-300 hover:after:w-[calc(100%-32px)]",
                  {
                    "text-radiance-white": variant === "light",
                    "text-radiance-navy": variant === "dark",
                  }
                )}
              >
                {item.label}
              </Link>
            )}

            {/* Dropdown */}
            {hasDropdown && (
              <div
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 min-w-[220px] pt-2 transition-all duration-200",
                  isActive
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg shadow-xl border overflow-hidden",
                    {
                      "bg-primary/95 backdrop-blur-md border-secondary-light-brown/20":
                        variant === "light",
                      "bg-white/95 backdrop-blur-md border-muted-navy/10":
                        variant === "dark",
                    }
                  )}
                >
                  {item.dropdown!.map((dropItem) => (
                    <Link
                      key={dropItem.href}
                      href={dropItem.href}
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        "block px-5 py-3 text-sm font-medium transition-colors duration-200",
                        {
                          "text-bgPure hover:bg-secondary-light-brown/10 hover:text-secondary-light-brown":
                            variant === "light",
                          "text-radiance-navy hover:bg-primary/5 hover:text-secondary":
                            variant === "dark",
                        }
                      )}
                    >
                      {dropItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

