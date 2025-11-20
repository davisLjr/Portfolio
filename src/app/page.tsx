"use client";

import Hero from "@/components/Hero";
import PreStack from "@/components/PreStack";
import Stack from "@/components/Stack";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <PreStack />
      <Stack />
      <AboutMe />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
}
