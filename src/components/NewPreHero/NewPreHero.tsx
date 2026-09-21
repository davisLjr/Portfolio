"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./NewPreHero.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Evita recalcular el pin cuando la barra de direcciones del navegador móvil
// aparece/desaparece (la causa #1 de saltos en secciones pinned). No afecta
// la rotación de pantalla.
ScrollTrigger.config({ ignoreMobileResize: true });

// useLayoutEffect en cliente, useEffect en SSR (evita el warning de React al renderizar en servidor)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface NewPreHeroProps {
  /** Palabra gigante que se revela con el scroll horizontal */
  title?: string;
  /** Imagen de fondo que se ve a través de las letras (ej: "/foto.jpg"). Si no se pasa, usa un degradé del theme */
  bgImage?: string;
  /** Video de fondo para toda la sección (ej: "/bg-loop.mp4"). Tiene prioridad sobre bgImage; las letras pasan a ser sólidas */
  bgVideo?: string;
}

export default function NewPreHero({ title = "Developer", bgImage, bgVideo }: NewPreHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const useImageBackground = !bgVideo && Boolean(bgImage);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const text = textRef.current;
    if (!section || !track || !text) return;

    // Respeta la preferencia de movimiento reducido: sin pin ni recorrido horizontal
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Recorrido = ancho total del texto menos el ancho visible
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // La palabra se desplaza horizontalmente al scrollear
      tl.to(track, { x: () => -getDistance(), ease: "none", force3D: true }, 0);

      // Con imagen de fondo: queda ESTÁTICA contra-animando su posición, para que
      // las letras funcionen como una ventana sobre ella. (Con video no aplica:
      // el video vive en una capa aparte detrás del texto.)
      if (useImageBackground) {
        tl.to(text, { backgroundPositionX: () => `${getDistance()}px`, ease: "none" }, 0);
      }

      // La tipografía cambia el ancho del texto al cargar: recalculamos cuando esté lista
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    }, section);

    // Limpieza total (evita duplicados y leaks con React Strict Mode)
    return () => ctx.revert();
  }, [title, bgImage, bgVideo]);

  // Reproduce el video solo cuando la sección está a la vista Y la pestaña activa
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true; // requerido para autoplay en móviles

    let isInView = false;

    const updatePlayback = () => {
      if (isInView && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.1 }
    );

    document.addEventListener("visibilitychange", updatePlayback);
    observer.observe(section);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [bgVideo]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${bgVideo ? styles.sectionWithVideo : ""}`}
    >
      {bgVideo && (
        <div className={styles.videoLayer} aria-hidden="true">
          <video
            ref={videoRef}
            className={styles.video}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      )}

      <div className={styles.pinnedContainer}>
        <div ref={trackRef} className={styles.track}>
          <h2
            ref={textRef}
            className={`${styles.text} ${bgVideo ? styles.textMask : ""}`}
            style={useImageBackground ? { backgroundImage: `url(${bgImage})` } : undefined}
          >
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
}
