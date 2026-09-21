"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CurtainEffect.module.scss";

const CURTAIN_HOLD_MS = 800;

export default function CurtainEffect({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showCurtain, setShowCurtain] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("hasSeenCurtain")) {
      const raf = requestAnimationFrame(() => setShowCurtain(false));
      return () => cancelAnimationFrame(raf);
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("hasSeenCurtain", "true");
      setShowCurtain(false);
    }, CURTAIN_HOLD_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showCurtain && (
          <>
            <motion.div
              className={styles.curtainTop}
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
            <motion.div
              className={styles.curtainBottom}
              initial={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          </>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
