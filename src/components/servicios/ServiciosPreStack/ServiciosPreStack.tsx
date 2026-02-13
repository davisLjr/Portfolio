"use client";

import { useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import styles from "./ServiciosPreStack.module.scss";

type ServiceItem = {
  title: string;
  subtitle: string;
  position: "left" | "right";
};

const serviceItems: ServiceItem[] = [
  {
    title: "Diseño a tu medida",
    subtitle: "Proponemos el diseño o tomamos tus ideas y las hacemos realidad",
    position: "right",
  },
  {
    title: "Lista para vender",
    subtitle: "Formulario de contacto, WhatsApp directo y catálogo de productos",
    position: "left",
  },
  {
    title: "Visible en Google",
    subtitle: "SEO completo y metadata para que tus clientes te encuentren fácil",
    position: "right",
  },
  {
    title: "Tú eres el dueño",
    subtitle: "El código es tuyo, sin suscripciones ni dependencias de por vida",
    position: "left",
  },
  {
    title: "Con seguimiento",
    subtitle: "Ajustes y cambios incluidos durante los primeros meses sin costo extra",
    position: "right",
  },
];

export default function ServiciosPreStack() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleWork = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.7, 0.5]
  );

  const transformStyle = useMemo(
    () => ({
      scale: scaleWork,
      x: "-50%",
      y: "-50%",
    }),
    [scaleWork]
  );

  return (
    <section ref={containerRef} className={styles.prestack}>
      <motion.div
        className={styles.backgroundText}
        style={transformStyle}
      >
        IDEA
      </motion.div>

      <div className={styles.content}>
        {serviceItems.map((item, index) => (
          <ServiceItemComponent
            key={`${item.title}-${index}`}
            item={item}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

type ServiceItemProps = {
  item: ServiceItem;
  scrollYProgress: MotionValue<number>;
};

const ServiceItemComponent = memo(function ServiceItemComponent({
  item,
  scrollYProgress,
}: ServiceItemProps) {
  const dividerWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["20%", "40%", "70%", "100%"]
  );

  const itemClassName = useMemo(
    () =>
      `${styles.stackItem} ${
        item.position === "left" ? styles.left : styles.right
      }`,
    [item.position]
  );

  return (
    <div className={itemClassName}>
      <div className={styles.textContent}>
        <h2 className="font-bebas">{item.title}</h2>
        <p className={styles.subtitle}>{item.subtitle}</p>
        <motion.div
          className={styles.divider}
          style={{ width: dividerWidth }}
        />
      </div>
    </div>
  );
});
