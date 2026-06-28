"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firm, languages, navLinks, uiText, type Locale, type LocalizedText } from "@/lib/site-content";

type Translator = (value: LocalizedText) => string;

export default function PublicHeader({
  currentPage,
  language,
  setLanguage,
  t,
}: {
  currentPage: "home" | "blog";
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: Translator;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(currentPage !== "home");
  const copy = uiText[language];

  useEffect(() => {
    const onScroll = () => setScrolled(currentPage !== "home" || window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPage]);

  const closeMenu = () => setMenuOpen(false);
  const resolveHref = (href: string) => {
    if (!href.startsWith("#")) {
      return href;
    }

    return currentPage === "home" ? href : `/${href}`;
  };
  const brandHref = currentPage === "home" ? "#home" : "/";
  const contactHref = currentPage === "home" ? "#contact" : "/#contact";

  const languageButtons = languages.map((item) => (
    <button
      key={item.code}
      type="button"
      className={item.code === language ? "is-active" : ""}
      aria-pressed={item.code === language}
      onClick={() => {
        setLanguage(item.code);
        closeMenu();
      }}
    >
      {item.shortLabel}
    </button>
  ));

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="brand" href={brandHref} aria-label="Law Lens Nepal home" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">
          <Image
            className="brand-logo"
            src="/assets/images/law-lens-nepal-logo.svg"
            alt=""
            width={42}
            height={42}
            priority={currentPage === "home"}
          />
        </span>
        <span>
          <strong>{firm.name}</strong>
          <small>{t(firm.shortLocation)}</small>
        </span>
      </Link>

      <div className="language-toggle language-toggle-mobile" aria-label={copy.languageLabel}>
        {languageButtons}
      </div>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={resolveHref(link.href)}
            className={currentPage === "blog" && link.href === "/blog" ? "is-current" : undefined}
            aria-current={currentPage === "blog" && link.href === "/blog" ? "page" : undefined}
            onClick={closeMenu}
          >
            {t(link.label)}
          </Link>
        ))}
        <div className="language-toggle" aria-label={copy.languageLabel}>
          {languageButtons}
        </div>
        <Link className="nav-cta" href={contactHref} onClick={closeMenu}>
          {copy.navCta}
        </Link>
      </nav>
    </header>
  );
}
