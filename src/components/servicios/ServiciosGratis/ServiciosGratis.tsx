"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Lightbulb, Users } from "lucide-react";
import styles from "./ServiciosGratis.module.scss";

const steps = [
  {
    icon: MessageCircle,
    label: "01",
    title: "Asesoramiento gratuito",
    description:
      "Hablamos de tu negocio, tus objetivos y a quién te diriges. Te explico qué tipo de presencia digital necesitas y cómo orientarla para que convierta — sin rodeos y sin compromiso.",
  },
  {
    icon: Lightbulb,
    label: "02",
    title: "Propuesta de diseño gratis",
    description:
      "Con lo que me cuentes, te entrego hasta 3 propuestas visuales iniciales adaptadas a tu identidad. Ves cómo podría lucir tu sitio antes de invertir un solo euro.",
  },
  {
    icon: Users,
    label: "03",
    title: "Reunión para resolver tus dudas",
    description:
      "Una videollamada donde te explico cómo funciona una landing page o un funnel, por qué el diseño responsive es clave hoy en día y cómo tu presencia digital puede trabajar por ti 24/7.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

export default function ServiciosGratis() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const viewportConfig = useMemo(
    () => ({
      once: false,
      amount: isMobile ? 0.01 : 0.2,
      margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -100px 0px",
    }),
    [isMobile]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5 }}
        >
          Antes de elegir un plan
        </motion.p>

        <motion.h2
          className={`${styles.title} font-bebas`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Empezamos sin que te cueste nada
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Antes de ver los planes, quiero entender tu negocio. Te ofrezco tres
          pasos completamente gratuitos para que tomes la mejor decisión con
          toda la información.
        </motion.p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                className={styles.card}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className={styles.cardTop}>
                  <span className={`${styles.stepNumber} font-bebas`}>
                    {step.label}
                  </span>
                  <Icon size={22} className={styles.icon} strokeWidth={1.5} />
                </div>
                <h3 className={`${styles.cardTitle} font-bebas`}>
                  {step.title}
                </h3>
                <p className={styles.cardText}>{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className={styles.ctaNote}>
            Todo en móvil, todo responsive — porque más del 70% de tus futuros
            clientes te van a visitar desde el teléfono.
          </p>
          <a
            href="https://wa.me/34662402792?text=Hola%20Davis%2C%20quiero%20mi%20asesoramiento%20gratuito"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Quiero mi asesoramiento gratuito
          </a>
        </motion.div>
      </div>
    </section>
  );
}
