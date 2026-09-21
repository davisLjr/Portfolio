"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Mail, MessageCircle, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./ContactModal.module.scss";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactChannel {
  label: string;
  detail: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
}

const EMAIL_ADDRESS = "davislapenta@gmail.com";

const channels: ContactChannel[] = [
  {
    label: "LinkedIn",
    detail: "Perfil profesional",
    href: "https://www.linkedin.com/in/davis-laviera/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    detail: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
    icon: Mail,
    external: false,
  },
  {
    label: "WhatsApp",
    detail: "+34 662 402 792",
    href: "https://wa.me/34662402792",
    icon: MessageCircle,
    external: true,
  },
];

const TITLE_ID = "contact-modal-title";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const [copied, setCopied] = useState(false);

  // Email click: copy the address for guaranteed feedback; the mailto href
  // still attempts to open the user's default mail client.
  const handleEmailClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — mailto remains the only attempt.
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Escape listener is only attached while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Body scroll lock while open, released on close (same convention as Header/ProjectModal)
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus the close button on open and restore the previous focus on close
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
      return;
    }

    previouslyFocusedRef.current?.focus();
    previouslyFocusedRef.current = null;
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
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
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.6, 0.01, 0.05, 0.95] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            <div className={styles.content}>
              <h3 id={TITLE_ID} className={styles.title}>
                Hablemos
              </h3>
              <p className={styles.subtitle}>Elige el canal que prefieras.</p>

              <div className={styles.channels}>
                {channels.map(({ label, detail, href, icon: Icon, external }) => {
                  const isEmail = href.startsWith("mailto:");
                  return (
                    <a
                      key={label}
                      href={href}
                      className={styles.channel}
                      onClick={isEmail ? handleEmailClick : onClose}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <Icon size={24} className={styles.channelIcon} aria-hidden="true" />
                      <span className={styles.channelInfo}>
                        <span className={styles.channelLabel}>{label}</span>
                        <span className={styles.channelDetail} aria-live={isEmail ? "polite" : undefined}>
                          {isEmail && copied ? "¡Copiado!" : detail}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
