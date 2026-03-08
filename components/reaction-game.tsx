"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, RotateCcw, Info } from "lucide-react"

const PROGRESS_PER_TAP = 5
const COMBO_WINDOW_MS = 500
const COMBO_BONUS = 2
const WA_URL =
  "https://wa.me/905551234567?text=Merhaba,%20ilk%20yüzme%20dersimi%20ayırtmak%20istiyorum."

/** Referans görsele uygun: sarı simit içinde sarı ördek */
function DuckInRing({ className, lunge }: { className?: string; lunge: boolean }) {
  return (
    <motion.div
      className={className}
      animate={lunge ? { scale: [1, 1.15, 1], y: [0, -8, 0] } : {}}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <svg viewBox="0 0 120 100" className="h-16 w-20 sm:h-20 sm:w-24" fill="none">
        <ellipse cx="60" cy="58" rx="42" ry="28" fill="url(#ring-fill)" stroke="rgba(255,220,150,0.8)" strokeWidth="1.5" />
        <defs>
          <linearGradient id="ring-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE135" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#F4C430" />
          </linearGradient>
          <linearGradient id="duck-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="60%" stopColor="#FFE135" />
            <stop offset="100%" stopColor="#FFD54F" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="52" rx="22" ry="20" fill="url(#duck-body)" />
        <ellipse cx="60" cy="50" rx="18" ry="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <circle cx="60" cy="32" r="14" fill="url(#duck-body)" />
        <circle cx="60" cy="30" r="10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        <ellipse cx="55" cy="30" rx="3.5" ry="4" fill="#1a1a1a" />
        <circle cx="56" cy="28.5" r="1" fill="white" />
        <ellipse cx="65" cy="30" rx="3.5" ry="4" fill="#1a1a1a" />
        <circle cx="66" cy="28.5" r="1" fill="white" />
        <path d="M52 38 Q60 44 68 38 Q60 42 52 38" fill="#FF8C00" stroke="#E67E00" strokeWidth="0.8" />
        <path d="M56 38 L60 40 L64 38" stroke="#1a1a1a" strokeWidth="0.6" fill="none" />
      </svg>
    </motion.div>
  )
}

function FinishLine() {
  return (
    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 sm:right-4">
      <div className="flex flex-col rounded-lg border-2 border-white/80 bg-sky-400/90 shadow-lg">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex">
            {[0, 1, 2].map((j) => (
              <div
                key={j}
                className="h-3 w-4 border border-white/60 sm:h-4 sm:w-5"
                style={{ background: (i + j) % 2 === 0 ? "#0ea5e9" : "#fff" }}
              />
            ))}
          </div>
        ))}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-white drop-shadow sm:text-xs">Bitiş</span>
    </div>
  )
}

const CONFETTI_COLORS = ["#fbbf24", "#2B6CB0", "#ED8936", "#ec4899", "#fff", "#38bdf8"]
const CONFETTI_COUNT = 24

// Deterministik konfeti - hydration hatasi onlenir
const CONFETTI_PARTICLES = [...Array(CONFETTI_COUNT)].map((_, i) => ({
  angle: (i / CONFETTI_COUNT) * 360 + (i * 7) % 20,
  dist: 60 + (i * 11) % 80,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
}))

export function ReactionGame() {
  const [progress, setProgress] = useState(0)
  const [ripples, setRipples] = useState<{ id: number; x: number }[]>([])
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const [duckLunge, setDuckLunge] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [displaySeconds, setDisplaySeconds] = useState(0)
  const [finalSeconds, setFinalSeconds] = useState<number | null>(null)
  const [infoOpen, setInfoOpen] = useState(false)
  const infoRef = useRef<HTMLDivElement>(null)
  const rippleId = useRef(0)
  const lastTapRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const addRipple = useCallback((x: number) => {
    const id = ++rippleId.current
    setRipples((prev) => [...prev.slice(-5), { id, x }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 900)
  }, [])

  const handleTap = useCallback(() => {
    if (hasWon) return
    const now = Date.now()
    if (startTimeRef.current === null) startTimeRef.current = now
    const isCombo = now - lastTapRef.current < COMBO_WINDOW_MS
    lastTapRef.current = now
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
    comboTimeoutRef.current = setTimeout(() => setCombo(0), COMBO_WINDOW_MS)

    const newCombo = isCombo ? combo + 1 : 1
    setCombo(newCombo)
    if (newCombo > 1) setShowCombo(true)
    setTimeout(() => setShowCombo(false), 400)

    const bonus = newCombo > 1 ? (newCombo - 1) * COMBO_BONUS : 0
    const add = PROGRESS_PER_TAP + bonus
    setProgress((p) => {
      const next = Math.min(100, p + add)
      if (next >= 100) {
        setTimeout(() => {
          const start = startTimeRef.current ?? now
          setFinalSeconds((Date.now() - start) / 1000)
          setHasWon(true)
        }, 120)
      }
      return next
    })
    addRipple(progress)
    setDuckLunge(true)
    setTimeout(() => setDuckLunge(false), 260)
  }, [hasWon, combo, progress, addRipple])

  // Canlı süre güncellemesi (ilk tıklamadan itibaren)
  useEffect(() => {
    if (hasWon || progress === 0) return
    const t = setInterval(() => {
      if (startTimeRef.current !== null) {
        setDisplaySeconds((Date.now() - startTimeRef.current) / 1000)
      }
    }, 100)
    return () => clearInterval(t)
  }, [hasWon, progress])

  // Info tooltip: dışarı tıklanınca kapat
  useEffect(() => {
    if (!infoOpen) return
    const close = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) setInfoOpen(false)
    }
    document.addEventListener("click", close, true)
    return () => document.removeEventListener("click", close, true)
  }, [infoOpen])

  const reset = useCallback(() => {
    setProgress(0)
    setHasWon(false)
    setRipples([])
    setCombo(0)
    setDisplaySeconds(0)
    setFinalSeconds(null)
    startTimeRef.current = null
  }, [])

  const openWhatsApp = useCallback(() => {
    window.open(WA_URL, "_blank", "noopener,noreferrer")
  }, [])

  return (
    <section
      id="mini-oyun"
      className="relative overflow-hidden border-y-2 border-primary/20 bg-gradient-to-b from-secondary/50 to-muted py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 block text-sm font-semibold uppercase tracking-wider text-primary"
        >
          Mini oyun
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl font-bold text-slate-800 sm:text-3xl"
        >
          Mini Yüzme Oyunu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 text-slate-600"
        >
          Tıkla yüzdür! Arka arkaya tıklarsan kombo bonusu kazanırsın.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mt-10 overflow-visible rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-200/50 backdrop-blur-sm"
        >
          {/* Kazanınca tüm alan win state – overflow visible ki konfeti görünsün */}
          <AnimatePresence mode="wait">
            {!hasWon ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Kombo bilgisi – köşede info ikonu, hover/click ile tooltip */}
                <div ref={infoRef} className="absolute right-3 top-3 z-30 flex justify-end">
                  <div className="group relative">
                    <button
                      type="button"
                      onClick={() => setInfoOpen((o) => !o)}
                      aria-label="Kombo nasıl çalışır?"
                      aria-expanded={infoOpen}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-500 shadow-md transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2"
                    >
                      <Info className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                    <div
                      className={`absolute right-0 top-full z-10 mt-1.5 w-52 transition-all duration-200 sm:right-full sm:mr-1.5 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2 sm:translate-x-2 ${
                        infoOpen ? "pointer-events-auto translate-y-0 opacity-100 sm:translate-x-0" : "pointer-events-none translate-y-0 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:sm:translate-x-0"
                      }`}
                    >
                      <div className="rounded-xl border border-amber-200/90 bg-white px-3 py-2.5 shadow-lg ring-1 ring-foreground/5">
                        <p className="text-xs leading-snug text-slate-600">
                          <span className="font-semibold text-amber-700">Kombo:</span> Arka arkaya hızlı tıklayınca her tıklama daha fazla ilerleme verir.
                        </p>
                        <div className="absolute -top-1 right-3 h-2 w-2 rotate-45 border-l border-t border-amber-200/90 bg-white sm:right-auto sm:left-0 sm:-left-1 sm:top-1/2 sm:-translate-y-1/2 sm:border-b sm:border-l-0 sm:border-r sm:border-t-0" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Havuz – sadece bu kısım overflow hidden */}
                <div
                  className="relative mx-3 mt-3 h-48 overflow-hidden rounded-2xl sm:h-56"
                  style={{
                    background:
                      "linear-gradient(180deg, #99d9e8 0%, #5ebcd6 35%, #0ea5e9 70%, #0284c7 100%)",
                    boxShadow:
                      "inset 0 4px 24px rgba(255,255,255,0.35), inset 0 -2px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Su dalgaları – eğrisel dalga çizgileri, sağa doğru akıyor (ilerliyormuş hissi) */}
                  <div className="absolute inset-0 overflow-hidden opacity-40">
                    {[0, 1, 2, 3, 4].map((row) => (
                      <motion.svg
                        key={row}
                        className="absolute w-[200%]"
                        style={{
                          top: `${18 + row * 18}%`,
                          height: "12%",
                        }}
                        viewBox="0 0 200 20"
                        preserveAspectRatio="none"
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{
                          duration: 3 + row * 0.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <path
                          d="M0 10 Q25 4 50 10 T100 10 T150 10 T200 10"
                          fill="none"
                          stroke="rgba(255,255,255,0.6)"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 12 Q25 6 50 12 T100 12 T150 12 T200 12"
                          fill="none"
                          stroke="rgba(255,255,255,0.35)"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    ))}
                  </div>
                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    {[0, 1, 2, 3, 4, 5].map((row) => (
                      <motion.svg
                        key={`b-${row}`}
                        className="absolute w-[200%]"
                        style={{
                          top: `${12 + row * 16}%`,
                          height: "14%",
                        }}
                        viewBox="0 0 200 24"
                        preserveAspectRatio="none"
                        initial={{ x: "-25%" }}
                        animate={{ x: "-75%" }}
                        transition={{
                          duration: 4 + row * 0.4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <path
                          d="M0 12 Q20 6 40 12 Q60 18 80 12 Q100 6 120 12 Q140 18 160 12 Q180 6 200 12"
                          fill="none"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    ))}
                  </div>
                  <FinishLine />

                  <div className="absolute left-4 right-16 top-1/2 h-full -translate-y-1/2 sm:left-6 sm:right-20">
                    <button
                      type="button"
                      onClick={handleTap}
                      className="absolute inset-0 z-10 cursor-pointer"
                      aria-label="Hızlı yüzmek için tıkla"
                    />
                    {ripples.map((r) => (
                      <motion.div
                        key={r.id}
                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white/70 bg-white/30"
                        style={{ left: `${r.x}%`, width: 18, height: 18 }}
                        initial={{ scale: 0.4, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    ))}
                    {showCombo && combo > 1 && (
                      <motion.span
                        className="absolute left-1/2 top-1/4 -translate-x-1/2 rounded-full bg-amber-400 px-2 py-0.5 text-sm font-bold text-white shadow-lg"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        x{combo} kombo!
                      </motion.span>
                    )}
                    <motion.div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `min(${progress}%, 88%)`, willChange: progress < 100 ? "left" : "auto" }}
                      animate={{
                        y: [0, -6, 0],
                        transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      <DuckInRing lunge={duckLunge} />
                    </motion.div>
                  </div>

                  {/* İlerleme çubuğu – havuzun alt kenarı */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-foreground/15 rounded-b-2xl overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-b-2xl"
                      initial={{ width: "0%" }}
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="border-t-2 border-primary/10 bg-gradient-to-r from-muted to-secondary/50 px-4 py-4">
                  <p className="mb-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-600">
                    <span>
                      İlerleme: <strong className="text-primary">{progress}%</strong>
                      {combo > 1 && <span className="ml-1 text-amber-600"> · x{combo} kombo!</span>}
                    </span>
                    {progress > 0 && (
                      <span className="font-medium tabular-nums text-slate-700">
                        Süre: <strong>{displaySeconds.toFixed(1)} s</strong>
                      </span>
                    )}
                  </p>
                  <motion.button
                    type="button"
                    onClick={handleTap}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="rounded-2xl bg-accent px-8 py-4 font-bold text-accent-foreground shadow-[var(--button-shadow-accent)] hover:shadow-lg"
                  >
                    Hızlı Yüzmek İçin Tıkla!
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="won"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative overflow-visible rounded-3xl bg-gradient-to-b from-background to-muted/60 px-4 py-8 sm:py-10"
              >
                {/* Konfeti - merkezden patlama */}
                <div className="pointer-events-none absolute inset-0 overflow-visible rounded-3xl">
                  {CONFETTI_PARTICLES.map((p, i) => {
                    const rad = (p.angle * Math.PI) / 180
                    return (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm"
                        style={{
                          backgroundColor: p.color,
                          boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                        animate={{
                          scale: [0, 1.2],
                          x: Math.cos(rad) * p.dist,
                          y: Math.sin(rad) * p.dist,
                          opacity: [1, 1, 0],
                          rotate: p.angle * 2,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.05 + i * 0.02,
                          type: "spring",
                          stiffness: 120,
                          damping: 14,
                        }}
                      />
                    )
                  })}
                  {/* Su sıçrama halkaları */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40"
                      initial={{ scale: 0.3, opacity: 0.8 }}
                      animate={{ scale: 2.5 + i * 0.5, opacity: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.1 + i * 0.15,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-20 flex flex-col items-center gap-4">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
                    className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-amber-200 bg-gradient-to-br from-amber-100 to-primary/10 shadow-xl ring-4 ring-white/80 sm:h-24 sm:w-24"
                    aria-hidden
                  >
                    <span className="text-3xl sm:text-4xl" role="img">👨‍🏫</span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="max-w-xs text-center font-serif text-lg font-bold text-slate-800 sm:text-xl"
                  >
                    Tebrikler! Ahmet Hoca havuzda seni bekliyor.
                    {finalSeconds !== null && (
                      <span className="mt-2 block text-base font-normal text-primary">
                        <strong className="tabular-nums">{finalSeconds.toFixed(1)} saniye</strong>de bitirdin!
                      </span>
                    )}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                  >
                    <motion.a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault()
                        openWhatsApp()
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-lg shadow-[0_4px_14px_rgba(237,137,54,0.3)] hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      İlk Dersini Ayırt
                    </motion.a>
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        reset()
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Tekrar Oyna
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
