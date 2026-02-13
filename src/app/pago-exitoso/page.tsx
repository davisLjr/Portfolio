"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import styles from "./page.module.scss";

export default function PagoExitoso() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={72} className={styles.icon} />
        </motion.div>

        <h1 className={`${styles.title} font-bebas`}>¡Pago confirmado!</h1>

        <p className={styles.text}>
          Gracias por tu confianza. Recibí tu pago correctamente.
        </p>
        <p className={styles.text}>
          Me pondré en contacto contigo en las próximas <strong>24 horas</strong> para
          comenzar con tu proyecto.
        </p>

        <a
          href={`https://wa.me/34662402792?text=Hola%20Davis%2C%20acabo%20de%20realizar%20mi%20pago`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Contáctame
        </a>

        <a href="/servicios" className={styles.link}>
          Volver a la página
        </a>
      </motion.div>
    </div>
  );
}
