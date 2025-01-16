"use client";
import { motion } from "framer-motion";

interface MotionFadedProps {
  children?: React.ReactNode;
  className?: string;
}
export const MotionFaded = ({ children, className }: MotionFadedProps) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
};
