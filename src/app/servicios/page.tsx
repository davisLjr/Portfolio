"use client";

import ParallaxIntro from "@/components/ParallaxIntro";
import ServiciosHero from "@/components/servicios/ServiciosHero";
import ServiciosPreStack from "@/components/servicios/ServiciosPreStack";
import ServiciosPricing from "@/components/servicios/ServiciosPricing";
import ServiciosAboutMe from "@/components/servicios/ServiciosAboutMe";
import WhatsAppButton from "@/components/servicios/WhatsAppButton";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import styles from "./page.module.scss";

export default function Servicios() {
  return (
    <div className={styles.page}>
      <ParallaxIntro textBefore="BIENVENID" textAfter="" />
      <ServiciosHero />
      <ServiciosPreStack />
      <ServiciosPricing />
      <ServiciosAboutMe />
      <Projects />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
