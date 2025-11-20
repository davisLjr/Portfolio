"use client";

import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import styles from "./Hero.module.scss";

export default function Hero() {
  const carouselText = "FRONT END DEVELOPER";

  const items = Array(10).fill(carouselText);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.hero}>
      <h1 className={styles.visuallyHidden}>
        Davis Lapenta - Front End Developer
      </h1>

      <div className={styles.carouselContainer}>
        <motion.div
          className={styles.carousel}
          animate={{
            x: [0, -1800],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((text, index) => (
            <div key={index} className={styles.carouselItem}>
              <span className="font-bebas" aria-hidden="true">{text}</span>
              <Star size={24} fill="currentColor" className={styles.star} aria-hidden="true" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          Soy desarrollador front-end con más de cinco años de experiencia
          creando interfaces escalables y accesibles, principalmente con React
          v18+, Next.js v15+ y TypeScript. A lo largo de mi carrera he
          trabajado en la construcción de design systems, componentes
          reutilizables y pruebas con Jest y React Testing Library, orientadas
          al UI/UX y a la mejora del código.
        </p>
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
