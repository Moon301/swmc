"use client";

import { motion } from "framer-motion";

/* 스크롤 등장 — 화면에 들어올 때 한 번만 살짝 떠오른다.
 * 로드 시점에 터지는 animate-fade-up과 달리 아래 섹션은 스크롤해야 나타나서 자연스럽다. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.61, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
