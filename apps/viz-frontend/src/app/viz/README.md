# Viz - Portfolio Frontend

Directorio principal de la aplicación frontend del portfolio. Contiene todas las secciones visuales y componentes principales de la página.

## 📁 Estructura del Directorio

```
viz/
├── (HeroSection)/          # Sección hero principal
│   ├── components/
│   │   ├── HeroLogo/
│   │   ├── HeroGreeting/
│   │   └── funny-cursor.tsx
│   ├── context/
│   │   └── CursorContext.tsx
│   ├── css/
│   │   └── *.css
│   ├── images/
│   │   └── bg-tech2.webp
│   ├── types.ts
│   └── index.tsx
│
├── (FooterSection)/        # Sección footer
│   ├── index.tsx
│   └── css/
│
├── (ResumeSection)/        # Sección de CV/Resume
│   ├── components/
│   ├── svg/
│   └── index.tsx
│
├── (PaymentSection)/       # Sección de métodos de pago
│   ├── components/
│   │   └── PaymentMethodCard.tsx
│   └── index.tsx
│
├── (ContactSection)/       # Sección de contacto
│   └── index.tsx
│
├── (TestimonialsSection)/  # Sección de testimonios
│   └── index.tsx
│
├── layout.tsx              # Layout raíz de viz
└── page.tsx                # Página principal
```

## 🎯 Descripción de Secciones

### HeroSection
**Ubicación:** `(HeroSection)/`

La sección principal (hero) con:
- Background image animado (webp)
- Cursor personalizado (funny cursor)
- Logo animado
- Greeting interactivo
- Blur overlay con gradiente

**Componentes principales:**
- `HeroLogo` - Logo principal animado
- `HeroGreeting` - Saludo y descripción
- `FunnyCursor` - Cursor personalizado solo en esta sección
- `CursorContext` - Context para controlar visibilidad del cursor

**Estilos:**
- Altura: `min-h-screen`
- Centrado: `flex items-center justify-center`
- Tema: `dark`

---

### FooterSection
**Ubicación:** `(FooterSection)/`

Pie de página con:
- Gradiente de texto animado
- Línea decorativa con blur
- Links sociales/portafolio
- Mensaje creativo

**Características:**
- Animaciones con Framer Motion
- Gradiente personalizado
- Backdrop blur

---

### ResumeSection
**Ubicación:** `(ResumeSection)/`

Sección de CV con:
- Botón descargar CV
- Copiar enlace a CV
- Ilustración SVG animada

**Funcionalidades:**
- Descargar PDF del CV
- Copiar enlace compartible
- Animaciones en entrada

---

### PaymentSection
**Ubicación:** `(PaymentSection)/`

Sección de métodos de pago con:
- Grid de tarjetas de pago
- Animations al hover/tap
- Selección de método
- Información de fuente de pago

**Componentes:**
- `PaymentMethodCard` - Tarjeta individual de pago

---

### ContactSection
**Ubicación:** `(ContactSection)/`

Sección de contacto con:
- Formulario de contacto
- Links de contacto
- Información de redes sociales

---

### TestimonialsSection
**Ubicación:** `(TestimonialsSection)/`

Sección de testimonios/reviews

---

## 🎨 Estilos y Temas

### Dark Mode
Todas las secciones usan tema oscuro por defecto con clase `dark`.

### Colores principales
- **Primary:** `oklch(0.7 0.25 264)` (Púrpura)
- **Accent:** Definido en variables CSS
- **Foreground:** Texto claro en dark mode
- **Background:** Fondo oscuro con transparencias

### Animaciones
- **Framer Motion** para animaciones complejas
- **Tailwind CSS** para transiciones simples
- **requestAnimationFrame** para cursor personalizado

---

## 🚀 Características Principales

### 1. FunnyCursor (Solo HeroSection)
```tsx
// Solo funciona dentro de HeroSection
// Se muestra al entrar en la sección
// Desaparece al salir
```

**Implementación:**
- Context API para control global
- Event listeners en sección
- requestAnimationFrame para suavidad

### 2. Background Images
- Formato: WebP (optimizado)
- Next.js Image component
- Priority loading para hero
- Quality: 75 (balance tamaño/calidad)

### 3. Animaciones
- Entrada suave con opacity/translate
- Hover effects en botones y cards
- Tap feedback (scale 0.98)
- Scroll triggers con `whileInView`

---

## 📦 Dependencias

```json
{
  "framer-motion": "^11.x",
  "next": "^14.x",
  "lucide-react": "^latest",
  "clsx": "^latest",
  "tailwindcss": "^3.x"
}
```

---

## 🛠️ Convenciones de Código

### Nombres de carpetas
- Secciones: `(SectionName)/` (con paréntesis para rutas)
- Componentes: `ComponentName/` (PascalCase)
- Context: `CursorContext.tsx`
- Utilidades: `hooks/`, `utils/`

### Estructura de componentes
```tsx
'use client';  // Para componentes interactivos

import { dependencies } from '@/path';
import { useCustomHook } from '@/hooks';

interface ComponentProps {
  // Props typing
}

export default function Component(props: ComponentProps) {
  // Hooks
  // Logic
  // Render
}
```

### Clases Tailwind
- Mobile-first: `sm:`, `md:`, `lg:`
- Espaciado: `p-4`, `mb-4`, `gap-4`
- Texto: `text-lg`, `font-bold`, `text-foreground`
- Colores: `bg-slate-900/50`, `text-cyan-400`

---

## 🎬 Animaciones comunes

### Entrada (Hero)
```tsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Hover effect
```tsx
whileHover={{ scale: 1.05, translateY: -4 }}
whileTap={{ scale: 0.98 }}
```

### Fade in
```tsx
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ duration: 0.8, delay: 0.2 }}
```

---

## 📝 Variables CSS personalizadas

**Ubicación:** `globals.css` (en raíz)

```css
:root {
  --primary: oklch(0.7 0.25 264);
  --accent: /* valor */;
  --foreground: /* valor */;
  --background: /* valor */;
  --border: /* valor */;
  --muted-foreground: /* valor */;
}
```

---

## 🔧 Configuración

### Next.js
- App Router habilitado
- Image optimization activo
- CSS modules soportados
- TypeScript stricto

### Tailwind
- Plugins: typography, container-queries
- Tema personalizado con CSS variables
- Modo dark habilitado

---

## 🐛 Troubleshooting

### Cursor no aparece
- Verificar que `CursorProvider` envuelve la app
- Verificar que componente está dentro de HeroSection
- Revisar z-index (debe ser z-50)

### Imagen de fondo no se muestra
- Verificar ruta del archivo webp
- Reiniciar servidor: `npm run dev`
- Verificar que Image tiene `fill` prop

### Animaciones no suaves
- Verificar Framer Motion instalado
- Revisar requestAnimationFrame en hooks
- Comprobar performance en DevTools

---

## 📚 Recursos

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Context API](https://react.dev/reference/react/useContext)

---

## 👨‍💻 Autor

Oscar Cortez - Portfolio Frontend

---

## 📄 Licencia

MIT