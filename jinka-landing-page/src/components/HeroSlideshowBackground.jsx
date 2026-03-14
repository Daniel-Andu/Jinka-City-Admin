"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function HeroSlideshowBackground({
  images,
  intervalMs = 4500,
  imageBrightness = 0.45,
  overlay = "linear-gradient(to bottom, rgba(13,37,89,0.55), rgba(13,37,89,0.72))",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(images) || images.length < 2) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  const activeImage = Array.isArray(images) && images.length > 0 ? images[index % images.length] : "";

  return (
    <>
      <div style={{ position: "absolute", inset: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${activeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: `brightness(${imageBrightness})`,
              willChange: "opacity, transform",
            }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>

      <div style={{ position: "absolute", inset: 0, background: overlay }} />
    </>
  );
}
