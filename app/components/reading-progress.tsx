"use client";

import { useScroll, useSpring, useReducedMotion, motion } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-0.5 bg-fg z-50 origin-left"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
    />
  );
}
