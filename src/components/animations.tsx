import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

// Fade-in animation
export function FadeIn({
  children,
  delay = 0,
  ...props
}: { children: ReactNode; delay?: number } & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Slide-in from bottom animation
export function SlideInUp({
  children,
  delay = 0,
  ...props
}: { children: ReactNode; delay?: number } & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for children
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  ...props
}: { children: ReactNode; staggerDelay?: number } & MotionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({
  children,
  ...props
}: { children: ReactNode } & MotionProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Hover scale animation for interactive elements
export function HoverScale({
  children,
  scale = 1.05,
}: {
  children: ReactNode;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Scroll reveal animation
export function ScrollReveal({
  children,
  direction = "up",
  ...props
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
} & MotionProps) {
  const directions: Record<string, any> = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
