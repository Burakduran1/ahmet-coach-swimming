"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 3, suffix: "+", label: "Yıl Deneyim", prefix: "" },
  { value: 100, suffix: "+", label: "Mutlu Öğrenci", prefix: "" },
  { value: 500, suffix: "+", label: "Ders Saati", prefix: "" },
  { value: 98, suffix: "%", label: "Memnun Öğrenci", prefix: "" },
]

function AnimatedNumber({
  value,
  suffix,
  prefix,
  isInView,
}: {
  value: number
  suffix: string
  prefix: string
  isInView: boolean
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(increment * currentStep))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, isInView])

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString("tr-TR")
    }
    return num.toString()
  }

  return (
    <span>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="stats" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-accent/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Öğrenciler Bizi Seçiyor
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-foreground">Rakamlarla</span>{" "}
            <span className="text-gradient">Biz</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.06, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-3xl border-2 border-border/50 bg-card/80 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="relative"
                >
                  <span className="font-serif text-5xl font-bold text-gradient sm:text-6xl lg:text-7xl">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      isInView={isInView}
                    />
                  </span>
                </motion.div>

                <p className="relative mt-4 text-lg font-medium text-muted-foreground">
                  {stat.label}
                </p>

                {/* Decorative Line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-1 -translate-x-1/2 rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
    </section>
  )
}
