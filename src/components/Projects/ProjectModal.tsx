"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { Project } from "./types";
import styles from "./ProjectModal.module.scss";

type ModalProject = Extract<Project, { linkType: 'modal' }>;

interface ProjectModalProps {
  project: ModalProject;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.6, 0.01, 0.05, 0.95] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          <X size={24} />
        </button>

        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={`Captura de pantalla del proyecto ${project.title}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 700px"
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>

          <ul className={styles.details}>
            {project.modalDetails.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
