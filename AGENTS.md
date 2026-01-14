# AGENTS.md - Development Guide for AI Coding Agents

This guide is designed for agentic coding assistants working on this Next.js 16 portfolio project. Follow these conventions and commands when making changes.

## Project Overview

This is a **Next.js 16.0.10 portfolio website** built with:
- **React 19.2.0** with TypeScript
- **Tailwind CSS 4.x** for styling
- **shadcn/ui** components (New York variant)
- **Framer Motion** for animations
- **pnpm** as package manager

## Build, Lint & Test Commands

### Package Manager
Always use `pnpm` for package management:
```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add new dependency
pnpm add -D <package> # Add dev dependency
```

### Development & Build
```bash
pnpm dev             # Start development server (http://localhost:3000)
pnpm build           # Build production version
pnpm start           # Start production server
pnpm lint            # Run ESLint with Next.js config
```

### Testing
⚠️ **No testing framework is currently configured**. When adding tests:
- Consider `Vitest` for unit testing (faster than Jest with Next.js)
- Use `@testing-library/react` for component testing
- Consider `Playwright` for E2E testing

To run a single test (when testing is set up):
```bash
# Example for future implementation
pnpm test -- ComponentName.test.tsx
```

## Code Style Guidelines

### File & Directory Structure
```
app/                          # Next.js App Router
├── components/              # Page-specific components
├── globals.css             # Global styles
├── layout.tsx              # Root layout
└── page.tsx                # Homepage

components/                  # Shared components
└── ui/                     # shadcn/ui components

lib/                        # Utility functions
public/                     # Static assets
```

### TypeScript Configuration
- **Strict mode enabled** - all code must be properly typed
- Use **path aliases**: `@/*` maps to project root
- Target: **ES2017**
- Always export types with `type` keyword: `export type { MyType }`

### Import Conventions

**Import Order** (always follow this order):
1. React imports
2. Next.js imports  
3. Third-party libraries
4. Internal components (using `@/` alias)
5. Utilities
6. Types (imported with `type` keyword)

```typescript
import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "./types";
```

**Import Style Rules:**
- Use **named imports** over default imports when possible
- Use `type` imports for type-only imports
- Use `@/` path alias for internal imports
- Group related imports together

### Component Conventions

**Function Components:**
```typescript
interface ComponentNameProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function ComponentName({ title, children, className }: ComponentNameProps) {
  return (
    <div className={cn("base-styles", className)}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

**Key Rules:**
- Use **named function exports**: `export function ComponentName()`
- Always define **TypeScript interfaces** for props
- Use **PascalCase** for component names and files
- Include `children?: React.ReactNode` when needed
- Always include `className?: string` for styling flexibility

### Styling Guidelines

**Tailwind CSS Usage:**
```typescript
import { cn } from "@/lib/utils";

// Always use cn() utility for conditional classes
className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}
```

**CSS Custom Properties (used in this project):**
- `--font-geist-sans` and `--font-geist-mono` for fonts
- Custom CSS variables for colors (defined in globals.css)
- Dark theme is default - use appropriate contrast ratios

**Component Styling Rules:**
- Use **Tailwind classes** for styling
- Use `cn()` utility for conditional styling  
- Accept `className` prop for style overrides
- Prefer **semantic color classes** over hardcoded values
- Use **responsive prefixes** (`md:`, `lg:`) appropriately

### State Management
```typescript
// Use React built-in hooks
const [state, setState] = useState<Type>(initialValue);
const [loading, setLoading] = useState(false);

// For complex state, prefer useReducer
const [state, dispatch] = useReducer(reducer, initialState);
```

### Event Handling
```typescript
// Type event handlers properly
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Handle click
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle submit
};
```

### Naming Conventions

**Files & Directories:**
- **kebab-case** for files: `hero-section.tsx`, `command-menu.tsx`
- **PascalCase** for components: `HeroSection`, `CommandMenu`
- **camelCase** for utilities: `utils.ts`

**Variables & Functions:**
- **camelCase** for variables: `activeSection`, `isLoading`
- **camelCase** for functions: `handleClick`, `fetchData`
- **UPPER_CASE** for constants: `API_URL`, `MAX_RETRIES`

**CSS Classes:**
- Use **Tailwind utility classes**
- Custom CSS classes in **kebab-case**: `.custom-scrollbar`

### Error Handling

**For async operations:**
```typescript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Error fetching data:', error);
  setError(error instanceof Error ? error.message : 'An error occurred');
}
```

**For components:**
```typescript
// Use error boundaries for component errors
// Validate props at component entry
if (!requiredProp) {
  throw new Error('RequiredProp is required');
}
```

### Performance Considerations

**Image Optimization:**
```typescript
import Image from "next/image";

<Image
  src="/images/photo.jpg"
  alt="Description"
  width={500}
  height={300}
  priority={isAboveTheFold}
/>
```

**Code Splitting:**
```typescript
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>
});
```

## shadcn/ui Integration

This project uses **shadcn/ui with New York variant**:

```bash
# Adding new shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add input
```

**Component Usage:**
```typescript
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg" className="custom-classes">
  Click me
</Button>
```

## Animation Guidelines

**Framer Motion Usage:**
```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## Deployment & Environment

**Deployment:**
- Optimized for **Vercel deployment**
- **@vercel/analytics** is integrated
- Build outputs to `.next/` directory

**Environment:**
- **Node.js** for development
- **pnpm** for package management
- **Windows** development environment (C:\Personal-portfolio)

## Common Patterns in This Codebase

1. **Navigation with smooth scrolling:**
   ```typescript
   document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
   ```

2. **Backdrop blur effects:**
   ```typescript
   className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08]"
   ```

3. **Responsive design:**
   ```typescript
   className="hidden md:block" // Show on desktop only
   className="md:hidden"       // Show on mobile only
   ```

## Best Practices

- **Always run `pnpm lint` before committing**
- **Use TypeScript strict mode** - no `any` types
- **Test components in multiple screen sizes**
- **Optimize images and assets**
- **Follow Next.js App Router conventions**
- **Use semantic HTML elements**
- **Ensure proper accessibility (alt text, ARIA labels)**
- **Keep components small and focused**
- **Use descriptive variable and function names**