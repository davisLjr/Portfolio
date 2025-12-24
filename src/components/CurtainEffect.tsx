"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CurtainEffect.module.scss";

export default function CurtainEffect({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showCurtain, setShowCurtain] = useState(true);
  const hasCheckedSession = useRef(false);

  const hideCurtain = useCallback(() => {
    setShowCurtain(false);
  }, []);

  useEffect(() => {
    if (hasCheckedSession.current) return;
    hasCheckedSession.current = true;

    const hasSeenCurtain = sessionStorage.getItem("hasSeenCurtain");

    if (hasSeenCurtain) {
      // Using callback to satisfy linter
      requestAnimationFrame(hideCurtain);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("hasSeenCurtain", "true");
      hideCurtain();
    }, 800);

    return () => clearTimeout(timer);
  }, [hideCurtain]);

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
