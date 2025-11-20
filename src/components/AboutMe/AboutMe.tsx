"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./AboutMe.module.scss";

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  const viewportConfig = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return {
      once: false,
      amount: isMobile ? 0.01 : 0.3,
      margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -100px 0px"
    };
  }, []);

  return (
    <section id="aboutme" className={styles.aboutMe}>
      <div className={styles.container}>
        <motion.h2
          className={`${styles.title} font-bebas`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          Sobre mí
        </motion.h2>

        <div className={styles.contentWrapper}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className={styles.paragraph}>
              Soy desarrollador front-end con más de <span className={styles.highlight}>cinco años de experiencia</span> creando
              interfaces escalables, accesibles (WCAG) y de alto rendimiento. Trabajo principalmente
              con <span className={styles.highlight}>React.js, Next.js, Angular y TypeScript</span>.
            </p>

            <p className={styles.paragraph}>
              A lo largo de mi carrera he participado en la construcción y migración de design systems,
              el desarrollo de sitios web front-end y componentes reutilizables, además de la documentación
              técnica con Storybook y la implementación de pruebas con Jest y React Testing Library.
              Siempre mantengo el foco en la <span className={styles.highlight}>calidad del código</span>,
              la coherencia visual y la performance.
            </p>

            <p className={styles.paragraph}>
              Disfruto resolver problemas de UI/UX con una mirada técnica y de diseño, optimizando
              performance y experiencia del usuario. Me interesa seguir creciendo en entornos donde
              la <span className={styles.highlight}>colaboración, la accesibilidad y la mejora continua</span> sean
              parte de la cultura del equipo.
            </p>
          </motion.div>

          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, delay: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/gema.jpeg"
                alt="Gema, la princesa de casa"
                fill
                className={styles.image}
                style={{ opacity: isHovered ? 0 : 1 }}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <Image
                src="/gemahov.jpeg"
                alt="Gema, la princesa de casa"
                fill
                className={styles.image}
                style={{ opacity: isHovered ? 1 : 0 }}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <p className={styles.caption}>Gema, la princesa de casa</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
