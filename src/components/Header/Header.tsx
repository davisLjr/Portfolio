"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { HeaderProps } from "./types";
import styles from "./Header.module.scss";

const defaultNavItems = [
  { label: "Sobre mí", href: "#aboutme" },
  { label: "Proyectos", href: "#projects" },
];

export default function Header({ navItems = defaultNavItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const handleNavClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className="font-bebas">&lt;DAVIS LAPENTA/&gt;</span>
          </div>

          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={styles.themeButton}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <a href="mailto:davisjuniorlvlp@gmail.com" className={styles.contactButton}>
              Contáctame
            </a>
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle menu"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ""}`}
      >
        <button
          className={styles.drawerClose}
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <nav className={styles.drawerNav}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.drawerLink}
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              handleNavClick();
            }}
            className={styles.drawerThemeButton}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === "light" ? "Modo oscuro" : "Modo claro"}</span>
          </button>
          <a
            href="mailto:davisjuniorlvlp@gmail.com"
            className={styles.drawerContactButton}
            onClick={handleNavClick}
          >
            Contáctame
          </a>
        </nav>
      </div>

      {isDrawerOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
}
