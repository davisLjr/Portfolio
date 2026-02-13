"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ParallaxIntro.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxIntroProps {
  textBefore?: string;
  textAfter?: string;
}

export default function ParallaxIntro({ textBefore = "DEVEL", textAfter = "PER" }: ParallaxIntroProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const oLetterRef = useRef<HTMLSpanElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spacerRef.current || !overlayRef.current || !textRef.current || !oLetterRef.current || !backgroundRef.current) return;

    // Obtener el Hero y configurarlo inicialmente invisible
    const heroSection = document.querySelector('[data-parallax-hero]') as HTMLElement;
    if (heroSection) {
      gsap.set(heroSection, { opacity: 0 });
    }

    const ctx = gsap.context(() => {
      // Timeline principal estilo Apple - más suave y lenta
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: "top top",
          end: "+=180vh", // 1.8 pantallas de scroll para animación más suave y espaciada
          scrub: 2, // scrub más alto = más suave
          onLeave: () => {
            // Ocultar completamente el overlay cuando termine
            gsap.set(overlayRef.current, { display: "none" });
          },
          onEnterBack: () => {
            // Mostrar el overlay si se hace scroll hacia arriba
            gsap.set(overlayRef.current, { display: "flex" });
          },
        },
      });

      // Animar el texto (crecer y expandir letter-spacing)
      tl.to(textRef.current, {
        scale: 3,
        letterSpacing: "0.3em",
        duration: 0.3,
        ease: "power0.inOut", // Más suave
      })

      // Animar la letra O aún más grande (efecto de "entrar")
      .to(oLetterRef.current, {
        scale: 5,
        duration: 0.25,
        ease: "power0.in", // Más suave
        transformOrigin: "center center",
      }, "-=0.15")

      // Oscurecer el fondo progresivamente
      .to(backgroundRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "none",
      }, "-=0.25")

      // Hacer que el texto DEVELOPER desaparezca completamente
      .to(textRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power0.in", // Más suave
      })

      // Continuar creciendo la O hasta que ocupe casi toda la pantalla
      .to(oLetterRef.current, {
        scale: 15,
        duration: 0.35,
        ease: "power0.inOut", // Más suave
      }, "-=0.1")

      // CROSSFADE: La O se desvanece mientras el Hero aparece simultáneamente
      .to(oLetterRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })

      // Hero aparece al mismo tiempo que la O desaparece (crossfade)
      if (heroSection) {
        tl.to(heroSection, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        }, "-=0.5"); // Comienza al mismo tiempo que la O empieza a desvanecerse
      }

      // Fondo oscuro también desaparece
      tl.to(backgroundRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
      }, "-=0.4");
    }, spacerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Spacer invisible que actúa como trigger */}
      <div ref={spacerRef} className={styles.spacer} />

      {/* Overlay fijo que se superpone */}
      <div ref={overlayRef} className={styles.container}>
        {/* Fondo oscuro que aparece */}
        <div ref={backgroundRef} className={styles.darkBackground} />

        {/* Texto animado */}
        <div ref={textRef} className={styles.text}>
          <span>{textBefore}</span>
          <span ref={oLetterRef} className={styles.oLetter}>O</span>
          <span>{textAfter}</span>
        </div>
      </div>
    </>
  );
}
