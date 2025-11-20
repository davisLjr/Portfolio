"use client";

import { useMemo, memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Experience.module.scss";

type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

const experienceData: Experience[] = [
  {
    role: "Front-End Developer",
    company: "Nonconformist - Banco Macro",
    period: "10/2024 – Presente",
    highlights: [
      "Desarrollo y testeo de componentes para un Component Design System (CDS) en React Native, siguiendo las especificaciones de diseño en Figma.",
      "Iteración y optimización de componentes en React.js, priorizando la consistencia visual, la reutilización y la performance.",
      "Participación en la creación del entorno de librería de componentes en Angular 20, colaborando directamente en el desarrollo de 4 componentes base.",
      "Implementación de pruebas unitarias con Jest y documentación técnica con Storybook, asegurando trazabilidad y estabilidad.",
      "Soporte al equipo encargado de integrar los componentes, resolviendo incidencias y manteniendo la coherencia técnica del sistema.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "GCBA - Secretaría de innovación y transformación digital",
    period: "07/2022 – 10/2024",
    highlights: [
      "Participé en el desarrollo del Design System Obelisco, incorporando nuevos componentes en la librería existente en React.js y su documentación correspondiente.",
      "Desarrollé una nueva librería de componentes UI para sistemas basados en React.js y Angular, asegurando escalabilidad, accesibilidad (a11y) y consistencia visual según los lineamientos de UX en Figma. Más de 30 componentes en React.js y más de 10 en Angular v17+.",
      "Implementé un nuevo frontend en Next.js para la documentación y presentación del Design System, reemplazando la versión estática previa y mejorando su mantenibilidad.",
      "Mantuve la versión anterior del Design System operativa para proyectos legacy, coordinando una transición progresiva hacia la nueva versión.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "Dev Queens",
    period: "02/2020 – 07/2022",
    highlights: [
      "Maquetado de sitios web responsive (desktop y mobile) siguiendo diseños en Photoshop y Adobe XD.",
      "Mantenimiento y mejoras sobre sitios web existentes, incluyendo corrección de errores y ajustes visuales.",
      "Implementación de mejoras en la interfaz de usuario (UI) para actualizar y modernizar sitios en producción.",
      "Generación de documentación para asegurar trazabilidad de cambios.",
      "Optimización de velocidad de carga y mejoras en la usabilidad para una mejor experiencia del usuario.",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const ExperienceItem = memo(({ experience, isLast }: { experience: Experience; isLast: boolean }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "100%"]);

  const highlightsList = useMemo(
    () => (
      <ul className={styles.highlights}>
        {experience.highlights.map((highlight, index) => (
          <li key={`${experience.company}-highlight-${index}`} className={styles.highlight}>
            {highlight}
          </li>
        ))}
      </ul>
    ),
    [experience.highlights, experience.company]
  );

  return (
    <motion.div ref={itemRef} className={styles.experienceItem} variants={itemVariants}>
      <div className={styles.timeline}>
        <div className={styles.dot} />
        {!isLast && (
          <div className={styles.lineWrapper}>
            <motion.div
              className={styles.line}
              style={{ height: lineHeight }}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.role}>{experience.role}</h3>
          <p className={styles.period}>{experience.period}</p>
        </div>
        <p className={styles.company}>{experience.company}</p>
        {highlightsList}
      </div>
    </motion.div>
  );
});

ExperienceItem.displayName = "ExperienceItem";

export default function Experience() {
  const viewportConfig = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return {
      once: false,
      amount: isMobile ? 0.01 : 0.2,
      margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -50px 0px"
    };
  }, []);

  return (
    <section className={styles.experience}>
      <div className={styles.container}>
        <motion.h2
          className={`${styles.title} font-bebas`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          Experiencia
        </motion.h2>

        <motion.div
          className={styles.timelineContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {experienceData.map((exp, index) => (
            <ExperienceItem
              key={`${exp.company}-${index}`}
              experience={exp}
              isLast={index === experienceData.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
