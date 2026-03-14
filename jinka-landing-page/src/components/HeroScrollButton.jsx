"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroScrollButton({ label = "Scroll", onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        position: "absolute",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        color: "rgba(255,255,255,0.72)",
        fontSize: "0.72rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 6, 0] }}
      transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { repeat: Infinity, duration: 1.8 } }}
    >
      <span>{label}</span>
      <ChevronDown size={18} />
    </motion.button>
  );
}
