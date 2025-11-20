# Portfolio Base

Proyecto base de Next.js configurado con TypeScript, SCSS Modules y sistema de themes.

## Características

- Next.js 16 con App Router
- TypeScript
- SCSS Modules
- Sistema de themes (dark/light) con Context API
- Framer Motion para animaciones
- Fuentes configuradas: Bebas Neue (títulos) y Montserrat (texto)
- Optimización de imágenes desactivada

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.module.scss
├── components/
│   └── ExampleMotion.tsx
├── context/
│   └── ThemeContext.tsx
├── hooks/
├── lib/
│   └── motion.ts
└── styles/
    └── globals.scss
```

## Uso de fuentes

Las fuentes están configuradas con variables CSS:

### Clases globales disponibles

```tsx
<h1 className="font-bebas">Título con Bebas Neue</h1>
<p className="font-montserrat font-regular">Texto con Montserrat Regular</p>
<h2 className="font-montserrat font-bold">Título con Montserrat Bold</h2>
```

### Pesos disponibles para Montserrat

- `font-thin` (100)
- `font-extralight` (200)
- `font-light` (300)
- `font-regular` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)
- `font-extrabold` (800)
- `font-black` (900)

## Sistema de themes

```tsx
import { useTheme } from "@/context/ThemeContext";

function Component() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Cambiar tema</button>;
}
```

### Colores del theme

**Dark:**
- Background: `#141414`
- Text: `#ffffff`

**Light:**
- Background: `#f5f5f0`
- Text: `#151213`

## Animaciones con Motion

```tsx
import { motion } from "framer-motion";
import { fadeInUp, transition } from "@/lib/motion";

<motion.div
  initial={fadeInUp.initial}
  animate={fadeInUp.animate}
  transition={transition}
>
  Contenido animado
</motion.div>
```

### Variantes disponibles

- `fadeIn`
- `fadeInUp`
- `fadeInDown`
- `fadeInLeft`
- `fadeInRight`
- `scaleIn`
- `staggerContainer`

## Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
```
