"use client";

import { useMemo, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import styles from "./Projects.module.scss";

type Project = {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
};

const projectsData: Project[] = [
  {
    title: "Millobank - Web Front",
    description: "Juego simulador de billetera virtual con interfaz web moderna e interactiva.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/millo_g2vl1u.jpg",
    url: "https://millobank-front.vercel.app/",
    tags: ["React.js", "Next.js", "TypeScript"],
  },
  {
    title: "Millobank - App Simulador",
    description: "Aplicación móvil del juego simulador de banco virtual con experiencia nativa.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/app_t7gkba.jpg",
    url: "https://millo-bank.vercel.app/",
    tags: ["React Native", "Mobile", "Simulación"],
  },
  {
    title: "Obelisco Design System",
    description: "Librería de componentes web y sistema de diseño para el Gobierno de la Ciudad de Buenos Aires.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/obelisco_abqujm.jpg",
    url: "https://gcba.github.io/",
    tags: ["Design System", "React.js", "Angular", "Storybook"],
  },
  {
    title: "Ecommerce Decoración",
    description: "Template de ecommerce para emprendimiento de decoración de fiestas con catálogo y carrito.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/pin%CC%83a_cmtg8f.jpg",
    url: "https://react-course-ba.vercel.app/",
    tags: ["React.js", "Ecommerce", "UI/UX"],
  },
  {
    title: "Celpi",
    description: "Template de empresa que ofrece servicios tributarios con diseño profesional y moderno.",
    image: "https://res.cloudinary.com/djqiqpilh/image/upload/v1763660248/celpi_txvq1t.jpg",
    url: "https://example-celpi.vercel.app/",
    tags: ["Landing Page", "Corporate", "Responsive"],
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

const ProjectCard = memo(({ project }: { project: Project }) => {
  const tagsList = useMemo(
    () => (
      <div className={styles.tags}>
        {project.tags.map((tag, index) => (
          <span key={`${project.title}-tag-${index}`} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    ),
    [project.tags, project.title]
  );

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={`Captura de pantalla del proyecto ${project.title}`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.overlay}>
          <ExternalLink size={32} className={styles.icon} aria-hidden="true" />
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        {tagsList}
      </div>
    </motion.a>
  );
});

ProjectCard.displayName = "ProjectCard";

export default function Projects() {
  const viewportConfig = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return {
      once: false,
      amount: isMobile ? 0.01 : 0.2,
      margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -50px 0px"
    };
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
          {projectsData.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
