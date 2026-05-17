"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Phone, Search, ChevronDown,
  Palette, BookOpen, Layers, Package, Expand, Gift, ArrowRight, Box,
} from "lucide-react";
import { QuoteModal } from "@/components/forms/QuoteModal";
import {
  megaMenuCategories,
  mostWanted,
  exploreMore,
  popularSearches,
  rightColumnBlocks,
} from "@/components/layout/headerData";
import { useI18n } from "@/lib/i18n";

const navLinks = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.portfolio", href: "/portfolio" },
  { labelKey: "nav.contact", href: "/contact" },
];

const exploreIconMap: Record<string, React.ElementType> = {
  Palette, BookOpen, Layers, Package, Expand, Gift,
  ArrowRight,
};

// Map category icon name strings to lucide components
const categoryIconMap: Record<string, React.ElementType> = {
  FileText: Package, Building2: BookOpen, FileSpreadsheet: Layers,
  Book: BookOpen, Image: Expand, Calendar: Gift, Palette,
};

// Inline US flag SVG
const USFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm">
    <defs><clipPath id="a"><path d="M0 0h640v480H0z"/></clipPath></defs>
    <g clipPath="url(#a)">
      <path d="M0 0h640v480H0z" fill="#bd3d44"/>
      <path d="M0 0h640v30H0zm0 60h640v30H0zm0 60h640v30H0zm0 60h640v30H0zm0 60h640v30H0zm0 60h640v30H0zm0 60h640v30H0z" fill="#fff"/>
      <path d="M0 0h300v210H0z" fill="#192f5d"/>
      <path d="M31.2 0l4.2 12.7h13.2l-10.7 7.6 4.1 12.7-10.8-7.6-10.8 7.6 4.2-12.7-10.7-7.6h13.1zm50 0l4.2 12.7h13.2l-10.7 7.6 4.1 12.7-10.8-7.6-10.8 7.6 4.2-12.7-10.7-7.6h13.1zm50 0l4.2 12.7h13.2l-10.7 7.6 4.1 12.7-10.8-7.6-10.8 7.6 4.2-12.7-10.7-7.6h13.1zm50 0l4.2 12.7h13.2l-10.7 7.6 4.1 12.7-10.8-7.6-10.8 7.6 4.2-12.7-10.7-7.6h13.1zm50 0l4.2 12.7h13.2l-10.7 7.6 4.1 12.7-10.8-7.6-10.8 7.6 4.2-12.7-10.7-7.6h13.1zm-200 60l4.2 12.7h13.2l-10.7 7.6 4.1 12.7-10.8-7.6-10.8 7.6 4.2-12.7L175 210"/>
    </g>
  </svg>
);

// Inline Ethiopia flag SVG
const ETFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm">
    <defs><clipPath id="b"><path d="M0 0h640v480H0z"/></clipPath></defs>
    <g clipPath="url(#b)">
      <path d="M0 0h640v160H0zm0 160h640v160H0zm0 320V320h640z" fill="#078930"/>
      <path d="M0 0h640v160H0z" fill="#fcdd09"/>
      <path d="M0 320h640v160H0z" fill="#da121a"/>
      <circle cx="320" cy="240" r="80" fill="#0f47af"/>
      <circle cx="320" cy="240" r="70" fill="#fcdd09"/>
      <circle cx="320" cy="240" r="60" fill="#0f47af"/>
      <path d="M320 180l20 40 45-6-30 35 20 40-55-15-55 15 20-40-30-35 45 6z" fill="#fcdd09"/>
    </g>
  </svg>
);

const languages = [
  { code: "en" as const, labelKey: "header.lang.en", FlagComp: USFlag },
  { code: "am" as const, labelKey: "header.lang.am", FlagComp: ETFlag },
];

// Map nav link labels to i18n keys
const categoryI18nKeys: Record<string, string> = {
  "promo": "mega.category.promo",
  "corp": "mega.category.corp",
  "forms": "mega.category.forms",
  "books": "mega.category.books",
  "signs": "mega.category.signs",
  "events": "mega.category.events",
  "creative": "mega.category.creative",
};

const stockI18nKeys: Record<string, string> = {
  "Recycled": "mega.stock.recycled",
  "Kraft": "mega.stock.kraft",
  "Cotton": "mega.stock.cotton",
  "Duplex": "mega.stock.duplex",
  "Sandy Matte": "mega.stock.sandyMatte",
};

const inspiredI18nKeys: Record<string, string> = {
  "Business Card Maker": "mega.inspired.businessCardMaker",
  "Design Trends 2026": "mega.inspired.designTrends",
  "Typography Cards": "mega.inspired.typographyCards",
  "Download Templates": "mega.inspired.downloadTemplates",
  "Order Sample Pack": "mega.quality.orderSample",
};

export function Header() {
  const { locale, setLocale, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activePanel, setActivePanel] = useState(megaMenuCategories[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(100);
  const searchRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const productsBtnRef = useRef<HTMLButtonElement>(null);
  const productsNavRef = useRef<HTMLLIElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLang = languages.find(l => l.code === locale) || languages[0];
  const getLanguageLabel = useCallback((code: "en" | "am") => (
    t(code === "am" ? "header.lang.am" : "header.lang.en")
  ), [t]);

  // Calculate arrow position to align with Products button center
  useEffect(() => {
    if (menuOpen && productsBtnRef.current) {
      const rect = productsBtnRef.current.getBoundingClientRect();
      const headerRect = document.getElementById('site-header')?.getBoundingClientRect();
      if (headerRect) {
        setArrowLeft(rect.left - headerRect.left + rect.width / 2);
      }
    }
  }, [menuOpen]);

  // Hover open/close for mega menu
  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setMenuOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 600);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const openLanguageMenu = useCallback(() => {
    if (langTimerRef.current) clearTimeout(langTimerRef.current);
    setLangOpen(true);
  }, []);

  const closeLanguageMenu = useCallback(() => {
    langTimerRef.current = setTimeout(() => {
      setLangOpen(false);
    }, 220);
  }, []);

  const selectLanguage = useCallback((code: "en" | "am") => {
    setLocale(code);
    setLangOpen(false);
  }, [setLocale]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        setLangOpen(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  // Handle click outside mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        productsBtnRef.current &&
        !productsBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, closeMenu]);

  // Handle search outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <header id="site-header" ref={headerRef}>
        {/* TOP BAR */}
        <div className="header-top">
          <Link href="/" className="header-logo" aria-label="Daf Printing Homepage">
            <NextImage
              src="/assets/daf-logo.png"
              alt="Daf Printing Logo"
              width={38}
              height={38}
              className="flex-shrink-0"
            />
            <span className="logo-text">
              <span style={{ color: "var(--color-secondary)" }}>Daf</span> Printing
            </span>
          </Link>

          <div className={`search-container ${searchFocused ? "focused" : ""}`} ref={searchRef}>
            <div className="search-inner">
              <input
                type="text"
                className="search-input"
                placeholder={t("header.search")}
                aria-label={t("header.search")}
                autoComplete="off"
                onFocus={() => setSearchFocused(true)}
              />
              <span className="search-icon-right">
                <Search width={17} height={17} />
              </span>
            </div>
            <div className="search-dropdown">
              <div className="search-drop-quick">
                <div className="search-drop-label">{t("header.search")}</div>
                <div className="quick-links">
                  {popularSearches.map((item) => (
                    <a key={item.href} href={item.href} className="quick-link">
                      <Search width={15} height={15} />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="header-help">
            <Phone width={15} height={15} style={{ color: "var(--color-primary-light)" }} />
            <span className="help-label">{t("header.help")}</span>
            <a href="tel:+251930077432" className="help-phone">+251 930 077432</a>
          </div>

          <div className="header-socials">
            <a href="https://facebook.com" className="social-fb" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor"/></svg>
            </a>
            <a href="https://instagram.com" className="social-ig" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
            </a>
            <a href="https://telegram.org" className="social-tg" target="_blank" rel="noopener" aria-label="Telegram">
              <svg viewBox="0 0 24 24"><path d="M21.198 2.433a2.07 2.07 0 0 0-2.12.31L3.078 11.733c-1.15.463-1.14 1.336-.21 1.684l4.26 1.49 1.65 5.28c.18.58.72.82 1.12.53l2.37-1.94 4.4 3.25c.72.54 1.24.26 1.42-.68l2.56-12.07c.22-1.06-.33-1.64-1.07-1.3z" fill="currentColor"/></svg>
            </a>
            <a href="https://tiktok.com" className="social-tk" target="_blank" rel="noopener" aria-label="TikTok">
              <svg viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.05 1.55.08 3.11.24 4.65.91.46 1.85.87 2.88 1.07.05 1.48.04 2.97.06 4.46-1.01.27-2.03.5-2.95 1.02-.05 2.4.03 4.8-.08 7.2-.3 2.12-1.78 4.02-3.78 4.91-2.18.97-5.04.45-6.5-1.6-1.56-2.2-1.17-5.45 1.1-7.1 2.06-1.5 5.12-1.14 6.86.73.08-2.22.03-4.44.06-6.67-1.44-.55-2.97-1.1-4.21-2.1-.03-1.55-.02-3.1-.03-4.65z" fill="currentColor"/></svg>
            </a>
          </div>

          <div
            className={`lang-switcher ${langOpen ? "open" : ""}`}
            ref={langRef}
            onMouseEnter={openLanguageMenu}
            onMouseLeave={closeLanguageMenu}
            onFocus={openLanguageMenu}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setLangOpen(false);
              }
            }}
          >
            <button
              className="lang-switcher-btn"
              aria-label="Switch language"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((open) => !open)}
              type="button"
            >
              <currentLang.FlagComp />
              <span>{getLanguageLabel(currentLang.code)}</span>
              <ChevronDown width={12} height={12} className="chevron" />
            </button>
            <div className="lang-dropdown" role="listbox" aria-label="Select language">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-dropdown-item ${currentLang.code === lang.code ? "active" : ""}`}
                  onClick={() => selectLanguage(lang.code)}
                  role="option"
                  aria-selected={currentLang.code === lang.code}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <lang.FlagComp />
                    {getLanguageLabel(lang.code)}
                  </span>
                  {currentLang.code === lang.code && <span className="check">âœ“</span>}
                </button>
              ))}
            </div>
          </div>

          <button className="hamburger-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>

        <div className="header-splitter" />

        {/* BOTTOM NAV */}
        <div className="header-bottom">
          <ul className="nav-menu">
            <li
              className={`nav-item ${menuOpen ? "active" : ""}`}
              id="productsNav"
              ref={productsNavRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={productsBtnRef}
                className="nav-trigger"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                {t("nav.products")}
                <span className="nav-chevron">{"\u25BC"}</span>
              </button>

              {/* Mega Menu */}
              <div
                ref={megaRef}
                className={`mega-drop ${menuOpen ? "show" : ""}`}
                role="menu"
                style={{ '--arrow-left': `${arrowLeft}px` } as React.CSSProperties}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mega-layout">
                  {/* COLUMN 1: Categories Sidebar */}
                  <div className="mega-col-cats">
                    <div className="mega-cats-list">
                      <div className="mega-sidebar-title">{t("mega.categories")}</div>
                          {megaMenuCategories.map((cat) => {
                            const CatIcon = categoryIconMap[cat.icon] || Package;
                            const catLabelKey = categoryI18nKeys[cat.id] || cat.id;
                            return (
                              <button
                                key={cat.id}
                                className={`cat-btn ${activePanel === cat.id ? "is-active" : ""}`}
                                onMouseEnter={() => setActivePanel(cat.id)}
                              >
                                <CatIcon />
                                {t(catLabelKey)}
                              </button>
                            );
                          })}
                    </div>
                  </div>

                  {/* COLUMN 2: Most Popular */}
                  <div className="mega-col-popular">
                    {megaMenuCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className={`mega-popular-panel ${activePanel === cat.id ? "is-active" : ""}`}
                      >
                        <div className="sec-label">{t("mega.mostPopular")}</div>
                        <Link href={cat.href} className="featured-card">
                          <div className="featured-thumb">
                            <NextImage
                              src={cat.image}
                              alt={cat.label}
                              fill
                              className="featured-img"
                            />
                          </div>
                          <div className="featured-body">
                            <div className="featured-title">{t(categoryI18nKeys[cat.id] || cat.id)}</div>
                            <div className="featured-desc">{cat.heroDescription}</div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* COLUMN 3: Popular Styles 2Ã—2 grid */}
                  <div className="mega-col-styles">
                    {megaMenuCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className={`mega-styles-panel ${activePanel === cat.id ? "is-active" : ""}`}
                      >
                        <div className="sec-label">{t("mega.popularStyles")}</div>
                        <div className="style-grid">
                          {cat.subItems.slice(0, 4).map((item) => (
                            <Link key={item.href} href={item.href} className="style-card">
                              <div className="style-thumb">
                                <NextImage
                                  src={item.image}
                                  alt={item.label}
                                  fill
                                  className="style-img"
                                />
                              </div>
                              <div className="style-info">
                                <div className="style-name">{item.label}</div>
                                <div className="style-desc">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* COLUMN 4: Explore More + Right blocks */}
                  <div className="mega-col-right">
                    {rightColumnBlocks.map((block, idx) => {
                      const isExploreMore = block.badge === "Explore More";
                      const blockBadge = isExploreMore ? t("mega.exploreMore") : undefined;
                      const blockBadgeLabel = block.badgeLabel
                        ? t(block.badgeLabel === "Stocks" ? "mega.stocks" :
                            block.badgeLabel === "Get Inspired" ? "mega.getInspired" :
                            block.badgeLabel === "Feel the Quality" ? "mega.feelQuality" :
                            block.badgeLabel)
                        : undefined;
                      const stockIcons: Record<string, React.ElementType> = {
                        Recycled: Expand, Kraft: Box, Cotton: Gift, Duplex: Package, "Sandy Matte": Layers,
                      };
                      return (
                        <div key={idx}>
                          {idx > 0 && <hr className="mega-divider" />}
                          <div className="right-block">
                            <div className="badge-row">
                              {block.badge && <span className="badge">{blockBadge || block.badge}</span>}
                              {block.badgeLabel && <span className="badge-label">{blockBadgeLabel || block.badgeLabel}</span>}
                            </div>
                            {block.links.map((link) => {
                              const textKey = stockI18nKeys[link.label] || inspiredI18nKeys[link.label] || null;
                              const IconComp = isExploreMore
                                ? (exploreMore.find(e => e.label === link.label) 
                                    ? exploreIconMap[exploreMore.find(e => e.label === link.label)!.icon] || ArrowRight 
                                    : ArrowRight)
                                : stockIcons[link.label] || ArrowRight;
                              return (
                                <Link key={link.href} href={link.href} className="right-link">
                                  <IconComp />
                                  {textKey ? t(textKey) : link.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                    <div className="right-cta-card">
                      <div className="right-cta-icon">
                        <Package />
                      </div>
                      <div>
                        <div className="right-cta-text">{t("mega.cta.orderSample")}</div>
                        <div className="right-cta-sub">{t("mega.cta.sub")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {navLinks.slice(1).map((link) => (
              <li key={link.href} className="nav-item">
                <Link href={link.href}>{t(link.labelKey)}</Link>
              </li>
            ))}
          </ul>

          <button className="btn-quote" onClick={() => setQuoteModalOpen(true)}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            {t("btn.quote")}
          </button>
        </div>

        {/* Ambient overlay. Outside clicks are handled by the document listener. */}
        <div
          className={`mega-overlay ${menuOpen ? "show" : ""}`}
        />

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
            <div className="mobile-drawer open" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <NextImage src="/assets/daf-logo.png" alt="Daf Printing Logo" width={32} height={32} />
                    <span className="text-base font-black text-textMain">
                      <span style={{ color: "var(--color-secondary)" }}>Daf</span> Printing
                    </span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-2 text-textMuted hover:text-textMain transition-colors" aria-label="Close menu">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6">
                  <input type="text" className="search-input" placeholder={t("header.search")} aria-label={t("header.search")} />
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block px-4 py-4 text-base font-semibold text-textMain hover:bg-bgLight hover:text-primary rounded-xl transition-all duration-200" onClick={() => setMobileOpen(false)}>
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8">
                  <button onClick={() => { setMobileOpen(false); setQuoteModalOpen(true); }} className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-bgPure text-base font-bold tracking-wide rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                    {t("btn.quote")}
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-4">{t("footer.contact")}</p>
                  <div className="space-y-3">
                    <a href="tel:+251930077432" className="flex items-center gap-3 text-sm text-textMuted hover:text-primary transition-colors">
                      <Phone size={16} />
                      <span>+251 930 077432</span>
                    </a>
                    <a href="mailto:dafprinting@gmail.com" className="flex items-center gap-3 text-sm text-textMuted hover:text-primary transition-colors">
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <span>dafprinting@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
