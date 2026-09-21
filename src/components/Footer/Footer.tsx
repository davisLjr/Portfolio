"use client";

import { Download, Linkedin } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { theme, mounted } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Image
              src={mounted && theme === "light" ? "/logoLight.webp" : "/logoDark.webp"}
              alt="Davis Lapenta"
              width={180}
              height={18}
            />
          </div>

          <div className={styles.actions}>
            <a
              href="/FrontEnd_Developer_Davis.pdf"
              download="Davis_Lapenta_CV.pdf"
              className={styles.button}
            >
              <Download size={20} />
              <span>Descargar CV</span>
            </a>
            <a
              href="https://www.linkedin.com/in/davis-laviera/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Davis Lapenta. Todos los derechos reservados.
          </p>
          <p className={styles.email}>
            <a href="mailto:davislapenta@gmail.com">davislapenta@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
