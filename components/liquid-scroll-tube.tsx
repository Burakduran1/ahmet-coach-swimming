"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useMemo, useEffect, useState, useRef } from "react"

const BUBBLE_COUNT = 8
const SPLASH_PARTICLE_COUNT = 12

// Minimal ordek SVG
function DuckSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Simit */}
      <ellipse cx="16" cy="20" rx="12" ry="6" fill="url(#ring-grad)" />
      <ellipse cx="16" cy="20" rx="9" ry="4" fill="url(#ring-inner-grad)" opacity={0.5} />
      {/* Govde */}
      <ellipse cx="16" cy="16" rx="8" ry="7" fill="#FBBF24" />
      <ellipse cx="16" cy="15" rx="6" ry="5" fill="#FDE68A" opacity={0.7} />
      {/* Kafa */}
      <circle cx="21" cy="11" r="5" fill="#FBBF24" />
      <circle cx="22" cy="10" r="2.5" fill="#FDE68A" opacity={0.8} />
      {/* Gaga */}
      <path d="M24 11 L30 10 L24 13 Z" fill="#F97316" />
      {/* Goz */}
      <circle cx="23" cy="10" r="1.2" fill="#0F172A" />
      <circle cx="23.3" cy="9.5" r="0.4" fill="white" />
      {/* Kanat */}
      <ellipse cx="13" cy="15" rx="3" ry="4" fill="#F59E0B" opacity={0.9} />
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#FF8E53" />
          <stop offset="100%" stopColor="#FF6B6B" />
        </linearGradient>
        <linearGradient id="ring-inner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4E4" />
          <stop offset="100%" stopColor="#FFCACA" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Sevimli ahtapot - su seviyesine gore tepki verir
function OctopusBuddy({ waterLevel }: { waterLevel: number }) {
  const isHappy = waterLevel > 0.5
  const isVeryHappy = waterLevel > 0.85
  const isWorried = waterLevel < 0.2
  
  return (
    <motion.div
      className="relative"
      animate={isWorried ? {
        y: [0, -3, 0, -2, 0],
        rotate: [-5, 5, -5, 3, -3],
      } : isVeryHappy ? {
        y: [0, -4, 0],
        rotate: [-3, 3, -3],
        scale: [1, 1.05, 1],
      } : {
        y: [0, -2, 0],
      }}
      transition={{
        duration: isWorried ? 0.4 : 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 48 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-10"
        aria-hidden
      >
        {/* Kafa */}
        <ellipse cx="24" cy="18" rx="16" ry="14" fill="#E879F9" />
        <ellipse cx="24" cy="16" rx="12" ry="10" fill="#F0ABFC" opacity={0.6} />
        
        {/* Gozler */}
        <ellipse cx="18" cy="18" rx="4" ry="5" fill="white" />
        <ellipse cx="30" cy="18" rx="4" ry="5" fill="white" />
        
        {/* Goz bebekleri - su seviyesine gore degisir */}
        <motion.circle
          cx="18"
          cy={isWorried ? 20 : 18}
          r="2"
          fill="#0F172A"
          animate={isWorried ? { cy: [20, 19, 20] } : {}}
        />
        <motion.circle
          cx="30"
          cy={isWorried ? 20 : 18}
          r="2"
          fill="#0F172A"
          animate={isWorried ? { cy: [20, 19, 20] } : {}}
        />
        
        {/* Goz parlamalari */}
        <circle cx="17" cy="17" r="0.8" fill="white" />
        <circle cx="29" cy="17" r="0.8" fill="white" />
        
        {/* Agiz */}
        {isVeryHappy ? (
          // Cok mutlu - genis gulumseme
          <path d="M18 24 Q24 30 30 24" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : isHappy ? (
          // Mutlu - hafif gulumseme
          <path d="M20 24 Q24 27 28 24" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        ) : isWorried ? (
          // Endiseli - acik agiz
          <ellipse cx="24" cy="25" rx="3" ry="2" fill="#0F172A" />
        ) : (
          // Normal
          <path d="M21 24 Q24 25 27 24" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        )}
        
        {/* Yanaklar - mutluyken kizarir */}
        {isHappy && (
          <>
            <circle cx="12" cy="22" r="3" fill="#FDA4AF" opacity={0.5} />
            <circle cx="36" cy="22" r="3" fill="#FDA4AF" opacity={0.5} />
          </>
        )}
        
        {/* Tentakuller */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const baseX = 8 + i * 7
          const isOuter = i === 0 || i === 5
          return (
            <motion.path
              key={i}
              d={`M${baseX} 30 Q${baseX + (i < 3 ? -3 : 3)} 42 ${baseX + (i < 3 ? -5 : 5)} 52`}
              stroke="#E879F9"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              animate={isWorried ? {
                d: [
                  `M${baseX} 30 Q${baseX + (i < 3 ? -3 : 3)} 42 ${baseX + (i < 3 ? -5 : 5)} 52`,
                  `M${baseX} 30 Q${baseX + (i < 3 ? -6 : 6)} 40 ${baseX + (i < 3 ? -8 : 8)} 50`,
                  `M${baseX} 30 Q${baseX + (i < 3 ? -3 : 3)} 42 ${baseX + (i < 3 ? -5 : 5)} 52`,
                ]
              } : isVeryHappy ? {
                d: [
                  `M${baseX} 30 Q${baseX + (i < 3 ? -3 : 3)} 42 ${baseX + (i < 3 ? -5 : 5)} 52`,
                  `M${baseX} 30 Q${baseX + (i < 3 ? 2 : -2)} 44 ${baseX + (i < 3 ? -2 : 2)} 54`,
                  `M${baseX} 30 Q${baseX + (i < 3 ? -3 : 3)} 42 ${baseX + (i < 3 ? -5 : 5)} 52`,
                ]
              } : {}}
              transition={{
                duration: isWorried ? 0.3 : 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          )
        })}
        
        {/* Ter damlasi - endiseli iken */}
        {isWorried && (
          <motion.ellipse
            cx="38"
            cy="12"
            rx="2"
            ry="3"
            fill="#7DD3FC"
            animate={{ 
              y: [0, 5, 10],
              opacity: [1, 0.8, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
          />
        )}
        
        {/* Kalpler - cok mutlu iken */}
        {isVeryHappy && (
          <motion.g
            animate={{ 
              y: [-2, -8],
              opacity: [1, 0],
              scale: [0.8, 1.2]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            <path 
              d="M40 8 C40 5 38 4 36 4 C34 4 33 6 33 8 C33 6 32 4 30 4 C28 4 26 5 26 8 C26 12 33 16 33 16 C33 16 40 12 40 8 Z"
              fill="#F87171"
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  )
}

// Mini balik - su icinde yukari dogru yuzer
function TinyFish({ delay = 0, left = "30%" }: { delay?: number; left?: string }) {
  return (
    <motion.div
      className="absolute opacity-80"
      style={{ left, bottom: "10%" }}
      animate={{
        y: ["0%", "-120%"],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "linear",
      }}
    >
      <svg viewBox="0 0 24 12" className="h-3 w-6" aria-hidden>
        <ellipse cx="14" cy="6" rx="8" ry="4" fill="#38bdf8" />
        <path d="M6 4 L2 6 L6 8 Z" fill="#0ea5e9" />
        <circle cx="16" cy="5" r="1" fill="#0f172a" />
      </svg>
    </motion.div>
  )
}

// Dalga yuzey efekti
function WaveSurface() {
  return (
    <div className="absolute left-1/2 top-0 h-2 w-[200%] -translate-x-1/2 -translate-y-1 overflow-visible">
      <svg
        viewBox="0 0 120 8"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{ animation: "wave-slide 2s ease-in-out infinite" }}
      >
        <defs>
          <linearGradient id="wave-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-fill)"
          d="M0 4 C 15 1 25 7 40 4 C 55 1 65 7 80 4 C 95 1 105 7 120 4 L 120 8 L 0 8 Z"
        />
      </svg>
    </div>
  )
}

export function LiquidScrollTube() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isVisible, setIsVisible] = useState(false)
  const [splash, setSplash] = useState(false)
  const [waterLevel, setWaterLevel] = useState(0)
  const splashDone = useRef(false)

  // Sadece scroll basladiginda gorunur ol
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setIsVisible(v > 0.02)
      setWaterLevel(v)
      
      if (v >= 0.98 && !splashDone.current) {
        splashDone.current = true
        setSplash(true)
        setTimeout(() => setSplash(false), 1200)
      }
      if (v < 0.95) {
        splashDone.current = false
      }
    })
    return () => unsub()
  }, [scrollYProgress])

  const heightPercent = useTransform(smoothProgress, (v) => `${v * 100}%`)
  const widthPercent = useTransform(smoothProgress, (v) => `${v * 100}%`)

  // Deterministik degerler - hydration hatasi onlenir (8 baloncuk)
  const bubbles = useMemo(() => {
    const positions = [12, 28, 45, 62, 75, 38, 55, 22]
    const sizes = [2.2, 2.8, 2.5, 3, 2.4, 2.6, 2.9, 2.3]
    const durations = [3.2, 4, 3.6, 4.5, 3.8, 4.2, 3.4, 3.9]
    const delays = [0, 0.5, 1, 1.5, 2, 0.3, 1.2, 1.8]
    return Array.from({ length: BUBBLE_COUNT }, (_, i) => ({
      id: i,
      left: `${positions[i]}%`,
      size: sizes[i],
      duration: durations[i],
      delay: delays[i],
    }))
  }, [])

  const splashParticles = useMemo(() => {
    return Array.from({ length: SPLASH_PARTICLE_COUNT }, (_, i) => {
      const angle = (i / SPLASH_PARTICLE_COUNT) * 360 + (i * 2.5)
      const rad = (angle * Math.PI) / 180
      const dist = 25 + (i % 3) * 15
      return {
        id: i,
        tx: Math.cos(rad) * dist,
        ty: -Math.abs(Math.sin(rad) * dist) - 15,
        size: 3 + (i % 3),
        duration: 0.4 + (i % 4) * 0.06,
        delay: i * 0.015,
      }
    })
  }, [])

  return (
    <>
      <style>{`
        @keyframes wave-slide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
        }
      `}</style>

      {/* Masaustu: solda dikey tup (tup, ordek, ahtapot) */}
      <motion.div
        className="fixed left-3 top-[8vh] z-40 hidden h-[72vh] md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          x: isVisible ? 0 : -20 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative h-full w-4">
          {/* Cam tup SVG cercevesi */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 16 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Dis cam - gradient kenarlar */}
            <defs>
              <linearGradient id="glass-edge-left" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="glass-edge-right" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="glass-shine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>
              <filter id="glass-blur">
                <feGaussianBlur stdDeviation="0.5" />
              </filter>
            </defs>
            
            {/* Tup arka plan - hafif saydam */}
            <rect x="1" y="6" width="14" height="188" rx="7" 
              fill="rgba(255,255,255,0.08)" 
            />
            {/* Sol kenar parlama */}
            <rect x="1" y="6" width="3" height="188" rx="1.5" 
              fill="url(#glass-edge-left)" 
            />
            {/* Sag kenar parlama */}
            <rect x="12" y="6" width="3" height="188" rx="1.5" 
              fill="url(#glass-edge-right)" 
            />
            {/* Ust kapak */}
            <ellipse cx="8" cy="8" rx="7" ry="3" 
              fill="rgba(255,255,255,0.15)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            {/* Alt kapak */}
            <ellipse cx="8" cy="192" rx="7" ry="3" 
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            {/* Dis cerceve */}
            <rect x="1" y="6" width="14" height="188" rx="7" 
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
            />
            <line x1="4" y1="16" x2="4" y2="184" 
              stroke="rgba(255,255,255,0.35)" 
              strokeWidth="1"
              strokeLinecap="round"
              filter="url(#glass-blur)"
            />
          </svg>
          
          {/* Su dolum alani */}
          <div 
            className="absolute bottom-[4%] left-[10%] right-[10%] top-[5%] overflow-hidden rounded-full"
          >
          {/* Su dolumu */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-full"
            style={{
              height: heightPercent,
              background: "linear-gradient(to top, #0284c7 0%, #0ea5e9 40%, #22d3ee 75%, #67e8f9 100%)",
              boxShadow: "inset 0 -3px 15px rgba(2, 132, 199, 0.3)"
            }}
          >
            {/* Oksijen kabarciklari - yukari cikar */}
            {bubbles.map((b) => (
              <motion.div
                key={b.id}
                className="absolute rounded-full bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                style={{
                  left: b.left,
                  bottom: "5%",
                  width: b.size,
                  height: b.size,
                }}
                animate={{
                  y: ["0%", "-100vh"],
                  opacity: [0.7, 0],
                  scale: [1, 0.6],
                }}
                transition={{
                  duration: b.duration,
                  delay: b.delay,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
              />
            ))}

            {/* Mini baliklar */}
            <TinyFish delay={0} left="15%" />
            <TinyFish delay={3} left="55%" />

            {/* Dalga yuzey */}
            <WaveSurface />

            {/* Ordek */}
            <motion.div
              className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[65%]"
            >
              <motion.div
                animate={{ y: [0, -1.5, 0], rotate: [-2, 2, -2] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <DuckSVG className="h-7 w-7 drop-shadow-md" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Splash efekti */}
          {splash && (
            <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
              {splashParticles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-cyan-300/80"
                  style={{
                    width: p.size,
                    height: p.size,
                    boxShadow: "0 0 4px rgba(34, 211, 238, 0.5)",
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: p.tx,
                    y: p.ty,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
          </div>
        </div>

        {/* Ahtapot - tupun altinda */}
        <div className="mt-3 flex justify-center">
          <OctopusBuddy waterLevel={waterLevel} />
        </div>
        
        {/* Yuzde gostergesi */}
        <motion.div
          className="mt-1 text-center text-[10px] font-medium text-muted-foreground"
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0, 1]) }}
        >
          <motion.span className="text-primary">
            {useTransform(smoothProgress, (v) => `${Math.round(v * 100)}%`)}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Mobil: Navbar bitiminin hemen altinda (navbar min-h-[5.5rem], cubuk top-[5.5rem]) */}
      <motion.div
        className="fixed left-0 right-0 top-[5.5rem] z-[55] md:hidden"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-3 h-2.5 overflow-hidden rounded-full border border-white/50 bg-white/15 shadow-[inset_0_1px_10px_rgba(255,255,255,0.25)] backdrop-blur-sm">
          <motion.div
            className="relative h-full min-w-[12px] rounded-full"
            style={{
              width: widthPercent,
              background: "linear-gradient(to right, #0284c7 0%, #0ea5e9 45%, #22d3ee 85%, #67e8f9 100%)",
              boxShadow: "inset 0 0 12px rgba(2, 132, 199, 0.35)",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/70"
                style={{ left: `${15 + i * 40}%` }}
                animate={{ x: ["0%", "250%"], opacity: [0.8, 0] }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              />
            ))}
            <motion.div
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <DuckSVG className="h-6 w-6 drop-shadow-md" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        {/* Mobil: Ahtapot + yuzde cubugun altinda */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className="scale-75 origin-center">
            <OctopusBuddy waterLevel={waterLevel} />
          </div>
          <motion.span
            className="text-[10px] font-medium text-muted-foreground"
            style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0, 1]) }}
          >
            <motion.span className="text-primary">
              {useTransform(smoothProgress, (v) => `${Math.round(v * 100)}%`)}
            </motion.span>
          </motion.span>
        </div>
        {splash && (
          <div className="pointer-events-none absolute left-1/2 top-0 flex justify-center">
            {splashParticles.slice(0, 10).map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-cyan-300/90"
                style={{
                  width: p.size + 2,
                  height: p.size + 2,
                  boxShadow: "0 0 6px rgba(34, 211, 238, 0.6)",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: p.tx * 0.8,
                  y: p.ty - 24,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  )
}
