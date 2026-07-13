"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import styles from "./CookieConsent.module.scss";

type Consent = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent") as Consent;
    setConsent(stored);
    setMounted(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
  }, []);

  return (
    <>
      {consent === "accepted" && mounted && (
        <>
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","wnit4vhyja");`}
          </Script>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-RW6052EY21"
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-RW6052EY21');`}
          </Script>
        </>
      )}

      {mounted && (
        <AnimatePresence>
          {consent === null && (
            <motion.div
              className={styles.banner}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.text}>
                <p className={styles.heading}>Cookies</p>
                <p className={styles.description}>
                  Este sitio utiliza cookies de Google Analytics y Microsoft Clarity para analizar el tráfico y mejorar la experiencia. Podés aceptar o rechazar su uso.
                </p>
              </div>
              <div className={styles.buttons}>
                <button onClick={accept} className={styles.accept}>
                  Aceptar
                </button>
                <button onClick={decline} className={styles.decline}>
                  Rechazar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
