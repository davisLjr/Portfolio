"use client";

import { useMemo, memo } from "react";
import { motion } from "framer-motion";
import styles from "./Stack.module.scss";

type StackCategory = {
  title: string;
  items: string[];
};

const stackData: StackCategory[] = [
  {
    title: "Lenguajes & Web",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SASS", "LESS", "CSS Modules"],
  },
  {
    title: "Frameworks",
    items: ["React.js", "Next.js", "React Native", "Angular v17+", "Vite"],
  },
  {
    title: "UI & Diseño",
    items: ["Bootstrap", "Chakra UI", "Material UI", "Figma", "TailwindCSS", "Accessibility"],
  },
  {
    title: "Herramientas & DevOps",
    items: ["Git", "Bitbucket", "Jira", "Vercel", "Webpack", "Expo", "npm", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Testing & Docs",
    items: ["Jest", "React Testing Library", "Storybook", "Gatsby", "Documentación técnica", "Firebase"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const CategoryItem = memo(({ category }: { category: StackCategory }) => {
  const itemsList = useMemo(
    () => (
      <ul className={styles.itemsList}>
        {category.items.map((item, itemIndex) => (
          <li key={`${item}-${itemIndex}`} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    ),
    [category.items]
  );

  return (
    <motion.div className={styles.category} variants={itemVariants}>
      <h3 className={styles.categoryTitle}>{category.title}</h3>
      <div className={styles.divider} />
      {itemsList}
    </motion.div>
  );
});

CategoryItem.displayName = "CategoryItem";

export default function Stack() {
  const viewportConfig = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return {
      once: false,
      amount: isMobile ? 0.01 : 0.3,
      margin: isMobile ? "0px 0px -450px 0px" : "0px 0px -100px 0px"
    };
  }, []);

  const titleTransition = useMemo(() => ({ duration: 0.6 }), []);

  return (
    <section className={styles.stack}>
      <div className={styles.container}>
        <motion.h2
          className={`${styles.title} font-bebas`}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={titleTransition}
        >
          Tech Stack
        </motion.h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {stackData.map((category, index) => (
            <CategoryItem key={`${category.title}-${index}`} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
