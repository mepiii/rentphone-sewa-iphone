// Purpose: Scroll reveal section wrapper.
// Callers: marketing pages.
// Deps: Framer Motion.
// API: MotionSection component.
// Side effects: observes viewport visibility.
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function MotionSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.985, filter: "blur(10px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
