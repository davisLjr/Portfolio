"use client";

import { useState, useEffect, useId } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import ContactModal from "@/components/ContactModal";
import { HeaderProps } from "./types";
import styles from "./NewHeader.module.scss";

const defaultNavItems = [
  { label: "Sobre mí", href: "#aboutme" },
  { label: "Proyectos", href: "#projects" },
];

const serviciosNavItems = [
  { label: "Planes", href: "#planes" },
  { label: "Proyectos", href: "#projects" },
];

export default function NewHeader({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const resolvedNavItems = navItems ?? (pathname === "/servicios" ? serviciosNavItems : defaultNavItems);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  // ID único del filtro SVG (evita colisiones si hay más de un cristal en la página)
  const rawId = useId();
  const filterId = `lg-dist-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    if (isDrawerOpen || isContactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen, isContactOpen]);

  const handleNavClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Capas del cristal (Liquid Glass).
            ⚠️ backdropFilter/filter van INLINE: LightningCSS/Turbopack rompe blur(0px) en CSS. */}
        <div
          className={styles.glassFilter}
          style={{
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
            filter: `url(#${filterId})`,
          }}
          aria-hidden="true"
        />
        <div className={styles.glassOverlay} aria-hidden="true" />
        <div className={styles.glassSpecular} aria-hidden="true" />

        <svg style={{ display: "none" }} aria-hidden="true">
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src={mounted && theme === "light" ? "/logoLight.webp" : "/logoDark.webp"}
              alt="Davis Lapenta"
              width={180}
              height={18}
              priority
            />
          </div>

          <nav className={styles.desktopNav}>
            {resolvedNavItems.map((item) => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={styles.themeButton}
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "light" ? <Moon size={20} /> : <Sun size={20} />
              ) : (
                <Sun size={20} />
              )}
            </button>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setIsContactOpen(true)}
              className={styles.contactButton}
            >
              Contáctame
            </button>
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
          {resolvedNavItems.map((item) => (
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
            {mounted ? (
              <>
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                <span>{theme === "light" ? "Modo oscuro" : "Modo claro"}</span>
              </>
            ) : (
              <>
                <Sun size={20} />
                <span>Modo claro</span>
              </>
            )}
          </button>
          <button
            type="button"
            className={styles.drawerContactButton}
            onClick={() => {
              setIsDrawerOpen(false);
              setIsContactOpen(true);
            }}
          >
            Contáctame
          </button>
        </nav>
      </div>

      {isDrawerOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
