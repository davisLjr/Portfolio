"use client";

import { ReactNode, useId } from "react";
import styles from "./LiquidGlass.module.scss";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  /** Esquinas muy redondeadas tipo píldora (default: true) */
  rounded?: boolean;
  /** Ancho mínimo grande (ej. píldora ancha) */
  large?: boolean;
}

/**
 * Contenedor "Liquid Glass" — port fiel del efecto de refracción:
 * 3 capas (filtro SVG + overlay + specular) + contenido en z-index 3.
 *
 * ⚠️ Importante: ningún ancestro de este componente puede tener transform,
 * filter, opacity < 1 ni will-change — eso crea un "backdrop root" y rompe
 * la captura del backdrop-filter (la refracción deja de verse).
 */
export default function LiquidGlass({
  children,
  className,
  rounded = true,
  large = false,
}: LiquidGlassProps) {
  // ID único del filtro SVG (evita colisiones si hay más de un cristal en la página)
  const rawId = useId();
  const filterId = `lg-dist-${rawId.replace(/:/g, "")}`;

  return (
    <div
      className={`${styles.glassContainer} ${rounded ? styles.rounded : ""} ${large ? styles.large : ""} ${className ?? ""}`}
    >
      {/* Capa 0: captura el fondo + lo distorsiona con el filtro SVG.
          ⚠️ El backdrop-filter va INLINE a propósito: Turbopack/LightningCSS
          compila mal blur(0px) (lo convierte en blur() vacío e inválido). */}
      <div
        className={styles.glassFilter}
        style={{
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          filter: `url(#${filterId})`,
        }}
        aria-hidden="true"
      />

      {/* Capa 1: velo blanco sutil */}
      <div className={styles.glassOverlay} aria-hidden="true" />

      {/* Capa 2: brillo especular en los bordes */}
      <div className={styles.glassSpecular} aria-hidden="true" />

      {/* Definición del filtro SVG de refracción */}
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

      {/* Capa 3: contenido interactivo */}
      <div className={styles.glassContent}>{children}</div>
    </div>
  );
}
