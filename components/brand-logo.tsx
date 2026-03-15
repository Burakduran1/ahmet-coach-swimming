"use client"

import { motion } from "framer-motion"

/** Can simidi logosu - Header ve Footer'da ortak kullanım */
export function LifebuoyLogo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"
  const innerDim = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <motion.div
      className={`relative flex ${dim} items-center justify-center ${className ?? ""}`}
      animate={{
        y: [0, -4, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FF6B6B 100%)",
          boxShadow: "0 4px 16px rgba(255, 107, 107, 0.35), inset 0 2px 8px rgba(255,255,255,0.4)",
        }}
      >
        {[0, 45, 90, 135].map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-white/50"
            style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.5) 0%, transparent 50%)",
          }}
        />
      </div>
      <div
        className={`absolute ${innerDim} rounded-full bg-white/90 shadow-inner`}
        style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}
      />
    </motion.div>
  )
}
