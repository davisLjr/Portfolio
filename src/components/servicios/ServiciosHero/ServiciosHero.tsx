"use client";

import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import styles from "./ServiciosHero.module.scss";

export default function ServiciosHero() {
  const carouselItems = [
    "TU NEGOCIO EXISTE.",
    "PERO EN INTERNET NO.",
  ];

  const items = Array(5).fill(carouselItems).flat();

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section data-parallax-hero className={styles.hero}>
      <h1 className={styles.visuallyHidden}>
        Davis Lapenta - Tu página web profesional
      </h1>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          <div className={styles.carousel}>
            {items.map((text, index) => (
              <div key={`original-${index}`} className={styles.carouselItem}>
                <span className="font-bebas" aria-hidden="true">{text}</span>
                <Star size={24} fill="currentColor" className={styles.star} aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className={styles.carousel} aria-hidden="true">
            {items.map((text, index) => (
              <div key={`duplicate-${index}`} className={styles.carouselItem}>
                <span className="font-bebas" aria-hidden="true">{text}</span>
                <Star size={24} fill="currentColor" className={styles.star} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={`${styles.title} font-bebas`}>
          Tu primera página web,<br />lista en días
        </h2>
        <p className={styles.description}>
          Sin tecnicismos, sin complicaciones. Llevamos tu negocio a internet
          con un diseño que atrae clientes y transmite confianza desde el primer clic.
        </p>
        <a
          href="https://wa.me/34662402792?text=Hola%20Davis%2C%20me%20interesa%20tener%20mi%20p%C3%A1gina%20web"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          Hablemos hoy
        </a>
      </div>

      <motion.button
        className={styles.scrollButton}
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.button>
    </section>
  );
}
