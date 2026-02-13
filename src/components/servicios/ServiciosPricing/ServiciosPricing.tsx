"use client";

import { useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./ServiciosPricing.module.scss";

type Feature = {
  label: string;
  included: boolean;
};

type Plan = {
  name: string;
  price: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  features: Feature[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Esencial",
    price: "$160",
    tagline: "Ideal para negocios que están empezando y necesitan presencia online básica.",
    ctaLabel: "Empezar con este plan",
    ctaHref: "https://buy.stripe.com/4gMdR9eeQ6DD2fV1mAaR200",
    features: [
      { label: "Hasta 3 secciones", included: true },
      { label: "Formulario de contacto", included: true },
      { label: "Botón de WhatsApp", included: true },
      { label: "Redirección a plataformas de pago", included: true },
      { label: "SEO básico", included: true },
      { label: "3 meses de ajustes incluidos", included: true },
      { label: "Diseño estándar", included: true },
    ],
  },
  {
    name: "Profesional",
    price: "$200",
    tagline: "Perfecto para negocios que quieren una imagen profesional sólida y generar más clientes.",
    ctaLabel: "Quiero este plan",
    ctaHref: "https://buy.stripe.com/9B63cveeQ8LLf2HghuaR201",
    popular: true,
    features: [
      { label: "Hasta 6 secciones estratégicas", included: true },
      { label: "Diseño 100% personalizado", included: true },
      { label: "SEO completo optimizado", included: true },
      { label: "Dominio gratis por 1 año", included: true },
      { label: "Catálogo de productos o servicios", included: true },
      { label: "Sección de testimonios o reseñas", included: true },
      { label: "Formulario de contacto optimizado", included: true },
      { label: "Botón de WhatsApp estratégico", included: true },
      { label: "6 meses de ajustes incluidos", included: true },
    ],
  },
  {
    name: "Completo",
    price: "$280",
    tagline: "Ideal para negocios que quieren invertir en publicidad y maximizar conversiones.",
    ctaLabel: "Quiero vender más",
    ctaHref: "https://buy.stripe.com/9B65kD7QsaTTcUz6GUaR202",
    features: [
      { label: "Todo lo incluido en el Plan Profesional", included: true },
      { label: "Hasta 2 funnels estratégicos orientados a producto o servicio", included: true },
      { label: "Diseño enfocado en conversión", included: true },
      { label: "Conexión a Stripe para cobros online", included: true },
      { label: "12 meses de soporte y ajustes", included: true },
      { label: "Soporte prioritario", included: true },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PlanCard = memo(({ plan }: { plan: Plan }) => (
  <motion.div
    className={`${styles.card} ${plan.popular ? styles.popular : ""}`}
    variants={cardVariants}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.25 }}
  >
    {plan.popular && (
      <div className={styles.badge}>MÁS POPULAR</div>
    )}
    <div className={styles.cardHeader}>
      <h3 className={`${styles.planName} font-bebas`}>{plan.name}</h3>
      <p className={styles.planTagline}>{plan.tagline}</p>
      <p className={`${styles.planPrice} font-bebas`}>{plan.price}</p>
    </div>

    <div className={styles.divider} />

    <ul className={styles.featuresList}>
      {plan.features.map((feature, index) => (
        <li key={index} className={styles.feature}>
          <Check size={16} className={styles.iconCheck} />
          <span>{feature.label}</span>
        </li>
      ))}
    </ul>

    <a
      href={plan.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.ctaButton} ${plan.popular ? styles.ctaButtonPrimary : ""}`}
    >
      {plan.ctaLabel}
    </a>
  </motion.div>
));

PlanCard.displayName = "PlanCard";

export default function ServiciosPricing() {
  const viewportConfig = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    return {
      once: false,
      amount: isMobile ? 0.01 : 0.2,
      margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -100px 0px",
    };
  }, []);

  const titleTransition = useMemo(() => ({ duration: 0.6 }), []);

  return (
    <section id="planes" className={styles.pricing}>
      <div className={styles.container}>
        <motion.h2
          className={`${styles.title} font-bebas`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={titleTransition}
        >
          Planes
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Sin sorpresas ni costos ocultos. Cada plan es una versión más poderosa del anterior.
        </motion.p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </motion.div>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          * En todos los planes el código es tuyo. Sin suscripciones ni dependencias. Tu página puede ser modificada por cualquier desarrollador en el futuro.
        </motion.p>
      </div>
    </section>
  );
}
