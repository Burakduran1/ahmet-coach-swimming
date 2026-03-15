"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ChevronDown, Mouse } from "lucide-react"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const wordVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 14, stiffness: 80 },
    },
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Video Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=75"
          aria-hidden
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-swimmer-doing-butterfly-stroke-in-pool-1510-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </motion.div>

      {/* Yuzen baloncuklar - dekoratif (CSS animasyonlu, hydration-safe) */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <div className="absolute left-[10%] bottom-[-2%] h-3.5 w-3.5 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '0s' }} />
        <div className="absolute left-[17%] bottom-[6%] h-5 w-5 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '0.3s' }} />
        <div className="absolute left-[24%] bottom-[-1%] h-4 w-4 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '0.6s' }} />
        <div className="absolute left-[38%] bottom-[8%] h-6 w-6 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '0.9s' }} />
        <div className="absolute left-[52%] bottom-[2%] h-3.5 w-3.5 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '1.2s' }} />
        <div className="absolute left-[65%] bottom-[10%] h-5 w-5 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '1.5s' }} />
        <div className="absolute left-[78%] bottom-[4%] h-4 w-4 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '1.8s' }} />
        <div className="absolute left-[85%] bottom-[-3%] h-6 w-6 rounded-full bg-white/30 backdrop-blur-[1px] animate-float-bubble" style={{ animationDelay: '2.1s' }} />
      </div>

      {/* İki bölüm: üstte içerik (ortada), altta sadece scroll göstergesi – çakışma yok */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col px-4"
      >
        {/* Üst alan: rozet, başlık, metin, butonlar – bu alanda ortalanır */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center pt-16 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-6"
          >
            <motion.span
              className="inline-block rounded-full border-2 border-primary/40 bg-primary/15 px-5 py-2.5 text-sm font-semibold tracking-wider text-primary shadow-sm backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              İZMİR&apos;DE HER YAŞ İÇİN YÜZME
            </motion.span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.15 },
              },
            }}
            className="text-center font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block text-gradient">
              <motion.span variants={wordVariants} className="inline-block">
                Yüzmeyi
              </motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">
                Güvenle
              </motion.span>
            </span>
            <span className="mt-2 block text-foreground/90">
              <motion.span variants={wordVariants} className="inline-block">
                Öğrenin
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-auto max-w-xl text-center text-base text-foreground/90 sm:text-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.15)]"
          >
            İzmir yüzme kursu kapsamında Buca ve Bornova&apos;da çocuk yüzme dersi, yetişkin yüzme dersi, su korkusu programı sunuyorum. Birebir özel yüzme dersi ve grup yüzme dersi ile her yaş grubuna uygun programlarla öğrencilerimin suyla güvenli bir bağ kurmasını ve yüzmeyi doğru tekniklerle öğrenmesini hedefliyorum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex shrink-0 flex-col items-center gap-3 sm:flex-row"
          >
          <motion.a
            href="#egitimler"
            aria-label="Eğitim programlarını görüntüle"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative overflow-hidden rounded-2xl px-8 py-4 font-bold shadow-[0_4px_14px_rgba(194,65,12,0.35)] transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(194,65,12,0.4)]"
            style={{ backgroundColor: "#C2410C", color: "#fff" }}
          >
            <span className="relative z-10">Eğitimleri Keşfet</span>
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </motion.a>
            <motion.a
            href="#hakkimda"
            aria-label="Hakkımda bölümüne git"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="rounded-2xl border-2 border-primary/60 bg-white/80 px-8 py-4 font-semibold text-foreground shadow-md backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/15 hover:shadow-lg"
          >
            Tanışalım
          </motion.a>
          </motion.div>
        </div>

        {/* Alt bant: scroll göstergesi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex shrink-0 justify-center py-4 sm:py-6"
        >
          <motion.a
            href="#hakkimda"
            aria-label="Aşağı kaydır, sayfa içeriğine git"
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/60 px-4 py-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/80"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Mouse className="h-5 w-5 text-primary" aria-hidden />
            <ChevronDown className="h-4 w-4 text-primary" aria-hidden />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
