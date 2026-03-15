  "use client"

  import { useState, useCallback } from "react"
  import { motion } from "framer-motion"
  import { CONTACT } from "@/lib/contact"

  /** Resmi WhatsApp logosu (telefon + konuşma balonu) */
  function WhatsAppIcon({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  }

  export function WhatsAppButton({ embedded }: { embedded?: boolean }) {
    const [tapped, setTapped] = useState(false)

    const handleClick = useCallback(() => {
      setTapped(true)
      setTimeout(() => setTapped(false), 550)
      setTimeout(() => {
        window.open(CONTACT.whatsapp, "_blank", "noopener,noreferrer")
      }, 480)
    }, [])

    return (
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="WhatsApp ile iletişime geç"
        onClick={handleClick}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleClick())}
        className={`group cursor-pointer ${embedded ? "relative origin-bottom-right scale-[0.72]" : "fixed bottom-6 right-6 z-50"}`}
        initial={{ scale: 0, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: embedded ? 1.08 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Water Ripples */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="absolute h-24 w-24 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute h-24 w-24 rounded-full border-2 border-primary/25"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
          <motion.span
            className="absolute h-24 w-24 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          />
        </div>

        {/* Main Duck Container */}
        <motion.div
          className="relative"
          animate={{
            y: [0, -6, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 rounded-full bg-amber-400/20 blur-xl" />

          {/* Swimming Ring (Simit) */}
          <div className="relative">
            {/* Ring Outer */}
            <div
              className="relative h-24 w-24 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FF6B6B 100%)",
                boxShadow:
                  "0 8px 32px rgba(255, 107, 107, 0.4), inset 0 4px 12px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Ring Stripes */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-3 bg-white/40"
                    style={{
                      left: "50%",
                      transform: `translateX(-50%) rotate(${i * 45}deg)`,
                      transformOrigin: "center center",
                    }}
                  />
                ))}
              </div>

              {/* Ring Shine */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 40%)",
                }}
              />

              {/* Tıklanınca splash halkası */}
              {tapped && (
                <motion.span
                  className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              )}

              {/* Inner Hole with WhatsApp Icon */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  boxShadow:
                    "0 4px 16px rgba(37, 211, 102, 0.5), inset 0 2px 6px rgba(255, 255, 255, 0.3)",
                }}
                animate={tapped ? { scale: [1, 0.88, 1.05, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {/* Inner Shine */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)",
                  }}
                />

                {/* WhatsApp Icon (resmi logo) */}
                <WhatsAppIcon className="relative h-6 w-6 text-white drop-shadow-md" />

                {/* Bubble */}
                <motion.div
                  className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white/80"
                  animate={{
                    y: [-2, -10],
                    x: [0, 3],
                    opacity: [0.8, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.div>
            </div>

            {/* Su damlaları – teardrop şeklinde, tıklanınca fışkırır */}
            {tapped && (
              <>
                {[
                  { x: -10, y: 0 },
                  { x: 8, y: -6 },
                  { x: -6, y: -14 },
                  { x: 12, y: -8 },
                  { x: 0, y: -18 },
                  { x: -14, y: -6 },
                  { x: 10, y: -2 },
                  { x: -10, y: -10 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
                    style={{ filter: "drop-shadow(0 0 4px rgba(14, 165, 233, 0.5))" }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                      x: pos.x * 4,
                      y: pos.y * 2.5 - 24,
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.1, 0.5],
                      rotate: (pos.x + pos.y) * 6,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: i * 0.03,
                      ease: "easeOut",
                    }}
                  >
                    {/* Teardrop: uç yukarı, alt yuvarlak */}
                    <svg
                      viewBox="0 0 12 16"
                      className="h-4 w-3"
                      style={{ minWidth: 12, minHeight: 16 }}
                    >
                      <defs>
                        <linearGradient id={`drop-grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#bae6fd" />
                          <stop offset="50%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#2B6CB0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M6 0C2.5 4 0 8 0 11.5C0 14 2 16 6 16C10 16 12 14 12 11.5C12 8 9.5 4 6 0Z"
                        fill={`url(#drop-grad-${i})`}
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="0.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                ))}
              </>
            )}

            {/* Duck Body - Sitting on Ring; tıklanınca tatlı zıplar + kendi etrafında döner (suya atlıyor) */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2"
              animate={
                tapped
                  ? {
                      y: [0, -24, 0],
                      rotate: [0, 380],
                      scale: [1, 1.12, 1],
                    }
                  : { rotate: [-3, 3, -3] }
              }
              transition={
                tapped
                  ? { duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              {/* Duck Shadow on Ring */}
              <div className="absolute bottom-0 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-foreground/10 blur-sm" />

              {/* Duck Body */}
              <div
                className="relative h-10 w-12 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #FFE135 0%, #FFD700 50%, #FFC107 100%)",
                  boxShadow:
                    "0 4px 12px rgba(255, 193, 7, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.4)",
                }}
              >
                {/* Body Shine */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)",
                  }}
                />

                {/* Duck Tail */}
                <div
                  className="absolute -right-1 bottom-1 h-3 w-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)",
                    transform: "rotate(-20deg)",
                  }}
                />
              </div>

              {/* Duck Head */}
              <div
                className="absolute -top-5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #FFE135 0%, #FFD700 100%)",
                  boxShadow: "inset 0 2px 6px rgba(255, 255, 255, 0.4)",
                }}
              >
                {/* Head Shine */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 25%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)",
                  }}
                />

                {/* Eyes */}
                <div className="absolute left-1.5 top-2 h-2 w-2 rounded-full bg-gray-900">
                  <div className="absolute left-0.5 top-0.5 h-0.5 w-0.5 rounded-full bg-white" />
                </div>
                <div className="absolute right-1.5 top-2 h-2 w-2 rounded-full bg-gray-900">
                  <div className="absolute left-0.5 top-0.5 h-0.5 w-0.5 rounded-full bg-white" />
                </div>

                {/* Beak */}
                <div
                  className="absolute left-1/2 top-4 h-2.5 w-4 -translate-x-1/2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF8C00 0%, #FF6600 100%)",
                    boxShadow: "inset 0 1px 3px rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>

              {/* Left Wing */}
              <motion.div
                className="absolute -left-1 top-3 h-4 w-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)",
                }}
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />

              {/* Right Wing */}
              <motion.div
                className="absolute -right-1 top-3 h-4 w-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)",
                }}
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Water Splashes */}
            <motion.div
              className="absolute -left-2 bottom-2 h-1.5 w-1.5 rounded-full bg-primary/60"
              animate={{
                y: [0, -8, 0],
                x: [-2, -4, -2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -right-2 bottom-3 h-1 w-1 rounded-full bg-primary/50"
              animate={{
                y: [0, -6, 0],
                x: [2, 4, 2],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg opacity-0 transition-opacity group-hover:opacity-100"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
        >
          WhatsApp&apos;tan Yazın
          <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-card" />
        </motion.div>
      </motion.div>
    )
  }
