"use client";

import { useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import styles from "./PreStack.module.scss";

type StackItem = {
  title: string;
  subtitle: string;
  position: "left" | "right";
};

const stackItems: StackItem[] = [
  {
    title: "Web development",
    subtitle: "UI / UX / Accesibility",
    position: "right",
  },
  {
    title: "React js",
    subtitle: "Next js, Vite, Js, Ts",
    position: "left",
  },
  {
    title: "React Native",
    subtitle: "Expo / Android / IOS",
    position: "right",
  },
  {
    title: "Angular",
    subtitle: "v+17",
    position: "left",
  },
  {
    title: "Styling",
    subtitle: "CSS / SCSS / Modules, Styled Components, Bootstrap, Tailwind",
    position: "right",
  },
];

export default function PreStack() {
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
        WORK
      </motion.div>

      <div className={styles.content}>
        {stackItems.map((item, index) => (
          <StackItemComponent
            key={`${item.title}-${index}`}
            item={item}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

type StackItemProps = {
  item: StackItem;
  scrollYProgress: MotionValue<number>;
};

const StackItemComponent = memo(function StackItemComponent({
  item,
  scrollYProgress,
}: StackItemProps) {
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
