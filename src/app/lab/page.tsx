import Image from "next/image";
import LiquidGlass from "@/components/LiquidGlass";
import styles from "./page.module.scss";

export const metadata = {
  title: "Lab — Liquid Glass",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <main className={styles.lab}>
      {/* Contenido del header real, estático, dentro del cristal */}
      <LiquidGlass large>
        <Image src="/logoDark.webp" alt="Davis Lapenta" width={180} height={18} priority />

        <nav className={styles.nav}>
          <a href="#">Sobre mí</a>
          <a href="#">Proyectos</a>
        </nav>

        <span className={styles.contact}>Contáctame</span>
      </LiquidGlass>
    </main>
  );
}
