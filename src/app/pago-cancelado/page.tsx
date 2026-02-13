"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import styles from "./page.module.scss";

export default function PagoCancelado() {
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
          <XCircle size={72} className={styles.icon} />
        </motion.div>

        <h1 className={`${styles.title} font-bebas`}>Pago no completado</h1>

        <p className={styles.text}>
          El pago no se procesó. Puede que hayas cancelado el proceso
          o haya ocurrido un error.
        </p>
        <p className={styles.text}>
          No se realizó ningún cargo. Puedes intentarlo de nuevo o escribirme
          directamente si necesitas ayuda.
        </p>

        <a href="/servicios#planes" className={styles.button}>
          Ver planes nuevamente
        </a>

        <a
          href={`https://wa.me/34662402792?text=Hola%20Davis%2C%20tuve%20un%20problema%20al%20realizar%20el%20pago`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Necesito ayuda por WhatsApp
        </a>
      </motion.div>
    </div>
  );
}
