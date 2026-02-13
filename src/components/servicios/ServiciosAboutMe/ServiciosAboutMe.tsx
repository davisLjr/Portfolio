"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ServiciosAboutMe.module.scss";

export default function ServiciosAboutMe() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const viewportConfig = useMemo(() => ({
    once: false,
    amount: isMobile ? 0.01 : 0.3,
    margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -100px 0px",
  }), [isMobile]);

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
          ¿Quién va a hacer tu página?
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
              Soy <span className={styles.highlight}>Davis Lapenta</span>, programador web con más de
              cinco años de experiencia construyendo páginas y aplicaciones para
              empresas y emprendedores de distintos rubros.
            </p>

            <p className={styles.paragraph}>
              Mi enfoque siempre ha sido el mismo:{" "}
              <span className={styles.highlight}>que las páginas no solo se vean bien</span>,
              sino que sean fáciles de usar para tus clientes y que transmitan
              exactamente lo que tu negocio quiere decir.
            </p>

            <p className={styles.paragraph}>
              Trabajo{" "}
              <span className={styles.highlight}>directo contigo, sin intermediarios</span>.
              Tú me cuentas tu negocio, tus colores, tu estilo — y yo me encargo
              de todo lo demás. Sin tecnicismos, sin complicaciones, paso a paso.
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
                src="/davis.jpeg"
                alt="Davis Lapenta"
                fill
                className={`${styles.image} ${isHovered ? styles.grayscale : ""}`}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <p className={styles.caption}>Davis Lapenta, programador UI / UX</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
