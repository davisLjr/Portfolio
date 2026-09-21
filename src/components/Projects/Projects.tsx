"use client";

import { memo, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Info } from "lucide-react";
import type { Project } from "./types";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.scss";

const projectsData: Project[] = [
  {
    title: "Obelisco Design System",
    description: "Librería de componentes web y sistema de diseño para el Gobierno de la Ciudad de Buenos Aires.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/obelisco_abqujm.jpg",
    linkType: "external",
    url: "https://gcba.github.io/",
    tags: ["Design System", "React.js", "Angular", "Storybook"],
  },
  {
    title: "Banco - Design System",
    description: "Desarrollo y documentación de sistema de diseño multi-plataforma para entidad bancaria.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1783951934/libreria_trgtzu.jpg",
    linkType: "modal",
    tags: ["Design System", "React.js", "React Native", "Angular", "Storybook"],
    modalDetails: [
      "Más de 40 componentes en React.js",
      "Más de 40 componentes en React Native",
      "Más de 40 componentes en Angular",
      "Documentación en Storybook",
      "Arquitectura monorepo",
      "Soporte técnico a equipos de implementación",
      "Iteración y mejora continua",
      "Testing automatizado de cada librería",
    ],
  },
  {
    title: "DevQueens",
    description: "Agencia de servicios digitales especializados en ecommerce, UI/UX y SEO.",
    image: "https://res.cloudinary.com/dljbxdjl7/image/upload/v1770841963/Captura_de_pantalla_2026-02-11_a_las_21.31.41_s6euem.jpg",
    linkType: "external",
    url: "https://www.devqueens.us/",
    tags: ["Servicios Digitales", "UI/UX", "SEO"],
  },
  {
    title: "Yelloow Terra",
    description: "Marketplace de productos ecológicos con sistema de puntuación de sostenibilidad (YTSS).",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1783951575/yelloowterra_uvel1r.jpg",
    linkType: "external",
    url: "https://www.yelloowterra.com/",
    tags: ["Shopify", "E-commerce", "Marketplace"],
  },
  {
    title: "Celpi",
    description: "Landing embudo para empresa de servicios legales, tributarios y administrativos. Diseñada para convertir visitas en clientes desde el primer clic.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/celpi_txvq1t.jpg",
    linkType: "external",
    url: "https://celpi.cl/",
    tags: ["Landing Page", "Funnel", "Servicios Legales"],
  },
  {
    title: "GC Asesores",
    description: "Sitio web para firma de asesoría fiscal, financiera y patrimonial con más de 35 años de experiencia.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1783951575/GCasesores_gdehqv.jpg",
    linkType: "external",
    url: "https://www.gcasesoresprofesionales.com/",
    tags: ["Next.js", "Consultoría", "Landing Page"],
  },
  {
    title: "Colegio de Contadores Valle Dorado",
    description: "Funnel orientado a publicidad para colegio de contadores, diseñado para convertir tráfico en registros.",
    image: "https://res.cloudinary.com/dljbxdjl7/image/upload/v1771019719/Captura_de_pantalla_2026-02-13_a_las_22.53.35_qedc3z.jpg",
    linkType: "external",
    url: "https://ccvd-wheat.vercel.app/",
    tags: ["Funnel", "Publicidad", "Responsive"],
  },
  {
    title: "Eternal Love",
    description: "Web funnel para emprendimiento de decoraciones y organización de eventos especiales.",
    image: "https://res.cloudinary.com/dljbxdjl7/image/upload/v1770841344/eternal.jpg",
    linkType: "external",
    url: "https://eternal-love-two.vercel.app/",
    tags: ["Landing Page", "Emprendimiento", "Decoración"],
  },
  {
    title: "Millobank - Web Front",
    description: "Juego simulador de billetera virtual con interfaz web moderna e interactiva.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/millo_g2vl1u.jpg",
    linkType: "external",
    url: "https://millobank-front.vercel.app/",
    tags: ["React.js", "Next.js", "TypeScript"],
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const CardContent = memo(({ project }: { project: Project }) => {
  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={`Captura de pantalla del proyecto ${project.title}`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className={styles.overlay}>
          {project.linkType === "modal" ? (
            <Info size={32} className={styles.icon} aria-hidden="true" />
          ) : (
            <ExternalLink size={32} className={styles.icon} aria-hidden="true" />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={`${project.title}-${tag}`} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
});

CardContent.displayName = "CardContent";

const ProjectCard = memo(({ project, onOpenModal }: { project: Project; onOpenModal?: () => void }) => {
  const motionProps = {
    className: styles.card,
    variants: cardVariants,
    whileHover: { y: -8 },
    transition: { duration: 0.3 },
  };

  if (project.linkType === "modal") {
    return (
      <motion.button onClick={onOpenModal} {...motionProps}>
        <CardContent project={project} />
      </motion.button>
    );
  }

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
    >
      <CardContent project={project} />
    </motion.a>
  );
});

ProjectCard.displayName = "ProjectCard";

export default function Projects() {
  const viewportConfig = useMemo(() => ({
    once: false,
    amount: 0.1,
    margin: "0px 0px -50px 0px"
  }), []);

  const [modalProject, setModalProject] = useState<Project | null>(null);

  const openModal = useCallback((project: Project) => {
    setModalProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setModalProject(null);
  }, []);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.h2
          className={`${styles.sectionTitle} font-bebas`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          Proyectos
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Estos son algunos de mis proyectos con versión pública disponible. Cuento con más proyectos privados que puedo mostrar a petición.
        </motion.p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpenModal={project.linkType === "modal" ? () => openModal(project) : undefined}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalProject && modalProject.linkType === "modal" && (
          <ProjectModal project={modalProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
